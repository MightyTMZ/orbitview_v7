from rest_framework import generics, permissions
from .models import (
    Category,
    SkillTag,
    Host,
    Event,
    Competition,
    ChallengeSubmission
)
from .serializers import (
    CategorySerializer,
    SkillTagSerializer,
    HostSerializer,
    EventSerializer,
    CompetitionSerializer,
    ChallengeSubmissionSerializer
)

# Category Views
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# SkillTag Views
class SkillTagListCreateView(generics.ListCreateAPIView):
    queryset = SkillTag.objects.all()
    serializer_class = SkillTagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Host Views
class HostListCreateView(generics.ListCreateAPIView):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    permission_classes = [permissions.IsAuthenticated]

class HostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    permission_classes = [permissions.IsAuthenticated]

# Event Views
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Competition Views
class CompetitionListCreateView(generics.ListCreateAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CompetitionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# ChallengeSubmission Views
class ChallengeSubmissionListCreateView(generics.ListCreateAPIView):
    serializer_class = ChallengeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChallengeSubmission.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ChallengeSubmissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChallengeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChallengeSubmission.objects.filter(user=self.request.user)
