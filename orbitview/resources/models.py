from django.db import models
from django.conf import settings
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
    organizer = models.CharField(max_length=255)
    url = models.URLField()
    tags = models.ManyToManyField("SkillTag", blank=True)
    difficulty_level = models.CharField(max_length=50, choices=[("beginner", "Beginner"), ("intermediate", "Intermediate"), ("advanced", "Advanced")])
    category = models.ManyToManyField(Category)  # e.g., Tech, Econ, MUN
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to="media/competitions/cover_images")


    @property
    def past(self):
        return self.end_date < datetime.now()

    def __str__(self):
        return self.title



class ChallengeSubmission(models.Model):

    def generate_title(length):
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for _ in range(length))
        return random_string
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default=generate_title(50))
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


class Program(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    url = models.URLField()
    duration_description = models.CharField(max_length=255)

    def __str__(self):
        return self.title
