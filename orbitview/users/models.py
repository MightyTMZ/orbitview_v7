from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=345, unique=True)
    date_of_birth = models.DateField(default=datetime.date(1900, 1, 1))
    bio = models.TextField(max_length=250, blank=True)
    website = models.URLField(blank=True, null=True)
    profile_image = models.ImageField(upload_to="profile_images/", blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} : {self.email} : {self.username}"