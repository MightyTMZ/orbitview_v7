from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Skill, Achievement, Project, CareerTimeline,
    UserSkill, Opportunity, OpportunityApplication
)

User = get_user_model()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'slug']
        read_only_fields = ['slug']

class UserSkillSerializer(serializers.ModelSerializer):
    skill_details = SkillSerializer(source='skill', read_only=True)
    
    class Meta:
        model = UserSkill
        fields = [
            'id', 'skill', 'skill_details', 'proficiency',
            'years_experience', 'is_verified', 'verified_by'
        ]
        read_only_fields = ['is_verified', 'verified_by']

class AchievementSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        many=True,
        required=False
    )
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'title', 'description', 'achievement_type',
            'date_achieved', 'issuer', 'verification_url',
            'skills', 'skill_ids'
        ]
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        achievement = Achievement.objects.create(**validated_data)
        if skill_ids:
            achievement.skills.set(skill_ids)
        return achievement
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if skill_ids is not None:
            instance.skills.set(skill_ids)
        instance.save()
        return instance

class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        many=True,
        required=False
    )
    collaborators = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        required=False
    )
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'start_date', 'end_date',
            'is_ongoing', 'visibility', 'github_url', 'live_url',
            'skills', 'skill_ids', 'collaborators'
        ]
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        collaborators = validated_data.pop('collaborators', [])
        project = Project.objects.create(**validated_data)
        if skill_ids:
            project.skills.set(skill_ids)
        if collaborators:
            project.collaborators.set(collaborators)
        return project
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        collaborators = validated_data.pop('collaborators', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if skill_ids is not None:
            instance.skills.set(skill_ids)
        if collaborators is not None:
            instance.collaborators.set(collaborators)
        instance.save()
        return instance

class CareerTimelineSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        many=True,
        required=False
    )
    
    class Meta:
        model = CareerTimeline
        fields = [
            'id', 'title', 'organization', 'description',
            'start_date', 'end_date', 'is_current', 'entry_type',
            'skills', 'skill_ids', 'impact_metrics'
        ]
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        timeline_entry = CareerTimeline.objects.create(**validated_data)
        if skill_ids:
            timeline_entry.skills.set(skill_ids)
        return timeline_entry
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if skill_ids is not None:
            instance.skills.set(skill_ids)
        instance.save()
        return instance

class OpportunitySerializer(serializers.ModelSerializer):
    required_skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        many=True,
        required=False
    )
    posted_by_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Opportunity
        fields = [
            'id', 'title', 'organization', 'description',
            'opportunity_type', 'location', 'is_remote',
            'required_skills', 'skill_ids', 'posted_by',
            'posted_by_details', 'posted_date', 'deadline',
            'is_active'
        ]
        read_only_fields = ['posted_by', 'posted_date']
    
    def get_posted_by_details(self, obj):
        return {
            'id': obj.posted_by.id,
            'name': obj.posted_by.get_full_name(),
            'email': obj.posted_by.email
        }
    
    def create(self, validated_data):
        skill_ids = validated_data.pop('skill_ids', [])
        validated_data['posted_by'] = self.context['request'].user
        opportunity = Opportunity.objects.create(**validated_data)
        if skill_ids:
            opportunity.required_skills.set(skill_ids)
        return opportunity
    
    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skill_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if skill_ids is not None:
            instance.required_skills.set(skill_ids)
        instance.save()
        return instance

class OpportunityApplicationSerializer(serializers.ModelSerializer):
    opportunity_details = OpportunitySerializer(source='opportunity', read_only=True)
    applicant_details = serializers.SerializerMethodField()
    
    class Meta:
        model = OpportunityApplication
        fields = [
            'id', 'opportunity', 'opportunity_details',
            'applicant', 'applicant_details', 'status',
            'applied_date', 'notes'
        ]
        read_only_fields = ['applicant', 'applied_date']
    
    def get_applicant_details(self, obj):
        return {
            'id': obj.applicant.id,
            'name': obj.applicant.get_full_name(),
            'email': obj.applicant.email
        }
    
    def create(self, validated_data):
        validated_data['applicant'] = self.context['request'].user
        return super().create(validated_data) 