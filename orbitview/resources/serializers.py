from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 
            'title',
        ]


class SkillTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillTag
        fields = [
            'id', 
            'name',
        ]


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['id', 'name', 'slogan', 'bio', 'cover_image']


class ProgramSerializer(serializers.ModelSerializer):
    host = HostSerializer(read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Program
        fields = [
            'id', 
            'title', 
            'description', 
            'host',
            'url',
            'duration_description',
            'cover_image',
            'category',
        ]


class EventSerializer(serializers.ModelSerializer):
    host = HostSerializer(read_only=True)
    host_id = serializers.PrimaryKeyRelatedField(
        queryset=Host.objects.all(), source='host', write_only=True
    )
    category = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'host', 'host_id',
            'url', 'location', 'start_time', 'end_time',
            'category', 'category_ids', 'cover_image',
        ]



class CompetitionSerializer(serializers.ModelSerializer):
    tags = SkillTagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=SkillTag.objects.all(), source='tags', write_only=True
    )
    category = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all(), source='category', write_only=True
    )
    past = serializers.ReadOnlyField()

    class Meta:
        model = Competition
        fields = [
            'id', 'title', 'description', 'organizer', 'url',
            'tags', 'tag_ids', 'difficulty_level', 'category',
            'category_ids', 'start_date', 'end_date', 'created_at', 'past', 'cover_image',
        ]


class ChallengeSubmissionSerializer(serializers.ModelSerializer):
    competition = CompetitionSerializer(read_only=True)
    competition_id = serializers.PrimaryKeyRelatedField(
        queryset=Competition.objects.all(), source='competition', write_only=True
    )
    user = serializers.StringRelatedField(read_only=True)  # You could also serialize as full user if needed
    edited = serializers.ReadOnlyField()

    class Meta:
        model = ChallengeSubmission
        fields = [
            'id', 'title', 'description', 'user',
            'competition', 'competition_id',
            'submitted_at', 'updated_at', 'link',
            'edited', 'is_verified'
        ]


class ReactionSerializer(serializers.ModelSerializer):
    content_type = serializers.SlugRelatedField(
        queryset=ContentType.objects.all(),
        slug_field='model'
    )

    class Meta:
        model = Reaction
        fields = ['id', 'user', 'reaction', 'content_type', 'object_id', 'timestamp']
        read_only_fields = ['id', 'user', 'timestamp']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
