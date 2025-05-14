from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import (
    Skill, Achievement, Project, CareerTimeline,
    UserSkill, Opportunity, OpportunityApplication
)
from .serializers import (
    SkillSerializer, AchievementSerializer, ProjectSerializer,
    CareerTimelineSerializer, UserSkillSerializer,
    OpportunitySerializer, OpportunityApplicationSerializer
)

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsOwnerOrPoster(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.posted_by == request.user

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class UserSkillViewSet(viewsets.ModelViewSet):
    serializer_class = UserSkillSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return UserSkill.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        user_skill = self.get_object()
        if user_skill.is_verified:
            return Response(
                {"detail": "Skill is already verified."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_skill.is_verified = True
        user_skill.verified_by = request.user
        user_skill.save()
        return Response(self.get_serializer(user_skill).data)

class AchievementViewSet(viewsets.ModelViewSet):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(
            Q(user=user) | 
            Q(visibility='PUBLIC') |
            (Q(visibility='CONNECTIONS') & Q(collaborators=user))
        ).distinct()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CareerTimelineViewSet(viewsets.ModelViewSet):
    serializer_class = CareerTimelineSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return CareerTimeline.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OpportunityViewSet(viewsets.ModelViewSet):
    serializer_class = OpportunitySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrPoster]
    
    def get_queryset(self):
        queryset = Opportunity.objects.filter(is_active=True)
        
        # Filter by skills
        skills = self.request.query_params.getlist('skills', [])
        if skills:
            queryset = queryset.filter(required_skills__slug__in=skills).distinct()
        
        # Filter by type
        opportunity_type = self.request.query_params.get('type', None)
        if opportunity_type:
            queryset = queryset.filter(opportunity_type=opportunity_type)
        
        # Filter by location/remote
        is_remote = self.request.query_params.get('remote', None)
        if is_remote is not None:
            queryset = queryset.filter(is_remote=is_remote.lower() == 'true')
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)
    
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        opportunity = self.get_object()
        
        # Check if already applied
        if OpportunityApplication.objects.filter(
            opportunity=opportunity,
            applicant=request.user
        ).exists():
            return Response(
                {"detail": "You have already applied for this opportunity."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create application
        application = OpportunityApplication.objects.create(
            opportunity=opportunity,
            applicant=request.user,
            notes=request.data.get('notes', '')
        )
        
        return Response(
            OpportunityApplicationSerializer(application).data,
            status=status.HTTP_201_CREATED
        )

class OpportunityApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = OpportunityApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return OpportunityApplication.objects.filter(
            Q(applicant=user) | Q(opportunity__posted_by=user)
        ).distinct()
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrPoster()]
        return [permissions.IsAuthenticated()]
    
    def perform_update(self, serializer):
        # Only allow status updates by the opportunity poster
        if 'status' in serializer.validated_data:
            if serializer.instance.opportunity.posted_by != self.request.user:
                raise permissions.PermissionDenied(
                    "Only the opportunity poster can update the application status."
                )
        serializer.save()
