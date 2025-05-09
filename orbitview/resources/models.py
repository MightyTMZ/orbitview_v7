from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from datetime import datetime
import string
import random


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class SkillTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Host(models.Model):
    name = models.CharField(max_length=255)
    slogan = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(max_length=1500)
    administrators = models.ManyToManyField(settings.AUTH_USER_MODEL) # add or remove people from the admin permissions of a host/company
    cover_image = models.ImageField(upload_to="media/hosts/cover_images")

    def __str__(self):
        return self.name


class Reaction(models.Model):
    REACTION_CHOICES = [
        ("like", "Like"),
        ("dislike", "Dislike"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reaction = models.CharField(max_length=10, choices=REACTION_CHOICES)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')  # one reaction per user per resource

    def __str__(self):
        return f"{self.user.username} - {self.reaction} - {self.content_object}"
    
    def get_likes_count(self):
        return Reaction.objects.filter(
            content_type=ContentType.objects.get_for_model(self),
            object_id=self.id,
            reaction='like'
        ).count()



class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    url = models.URLField()
    location = models.CharField(max_length=255, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    category = models.ManyToManyField(Category)
    cover_image = models.ImageField(upload_to="media/events/cover_images")

    def __str__(self):
        return self.title



class Competition(models.Model):        
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    organizer = models.ForeignKey(Host, on_delete=models.CASCADE)
    url = models.URLField()
    tags = models.ManyToManyField("SkillTag", blank=True)
    difficulty_level = models.CharField(max_length=50, choices=[("beginner", "Beginner"), ("intermediate", "Intermediate"), ("advanced", "Advanced")])
    category = models.ManyToManyField(Category)  # e.g., Tech, Econ, MUN
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to="media/competitions/cover_images")

    def clean(self):
        super().clean()
        if self.start_date and self.end_date:
            if self.end_date <= self.start_date:
                raise ValidationError("End date must be after the start date.")
            if self.end_date < timezone.now():
                raise ValidationError("End date cannot be in the past.")


    @property
    def past(self):
        return self.end_date < datetime.now()

    def __str__(self):
        return self.title



class ChallengeSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="-")
    description = models.TextField(max_length=5000, null=True, blank=True)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    link = models.URLField(blank=True, null=True)
    @property
    def edited(self):
        self.submitted_at != self.updated_at

    is_verified = models.BooleanField(default=False)
    cover_image = models.ImageField(upload_to="media/challenge_submissions/cover_images")        

    def save(self):
        title_length = 50
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for _ in range(title_length))
        self.title = random_string
        self.save()

    def __str__(self):
        return self.title


class Program(models.Model):
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    url = models.URLField()
    duration_description = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to="media/competitions/cover_images", null=True, blank=True)
    category = models.ManyToManyField(Category)        


    def __str__(self):
        return self.title
