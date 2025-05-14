from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50)  # e.g., "Programming", "Design", "Business"
    slug = models.SlugField(unique=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} ({self.category})"

class Achievement(models.Model):
    ACHIEVEMENT_TYPES = [
        ('CERT', 'Certification'),
        ('AWARD', 'Award'),
        ('PUBLICATION', 'Publication'),
        ('PATENT', 'Patent'),
        ('OTHER', 'Other'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=200)
    description = models.TextField()
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPES)
    date_achieved = models.DateField()
    issuer = models.CharField(max_length=200)  # e.g., "AWS", "MIT", "Google"
    verification_url = models.URLField(blank=True, null=True)
    skills = models.ManyToManyField(Skill, related_name='achievements')
    
    def __str__(self):
        return f"{self.title} - {self.issuer}"

class Project(models.Model):
    VISIBILITY_CHOICES = [
        ('PUBLIC', 'Public'),
        ('PRIVATE', 'Private'),
        ('CONNECTIONS', 'Connections Only'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_ongoing = models.BooleanField(default=False)
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='PUBLIC')
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    skills = models.ManyToManyField(Skill, related_name='projects')
    collaborators = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='collaborated_projects', blank=True)
    
    def __str__(self):
        return f"{self.title} by {self.user.get_full_name()}"

class CareerTimeline(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='timeline_entries')
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    entry_type = models.CharField(max_length=50)  # e.g., "Work Experience", "Education", "Volunteer"
    skills = models.ManyToManyField(Skill, related_name='timeline_entries')
    impact_metrics = models.JSONField(null=True, blank=True)  # Store quantifiable achievements
    
    def __str__(self):
        return f"{self.title} at {self.organization}"

class UserSkill(models.Model):
    PROFICIENCY_LEVELS = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
        (4, 'Expert'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    proficiency = models.IntegerField(choices=PROFICIENCY_LEVELS, validators=[MinValueValidator(1), MaxValueValidator(4)])
    years_experience = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    is_verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_skills')
    
    class Meta:
        unique_together = ('user', 'skill')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.skill.name} ({self.get_proficiency_display()})"

class Opportunity(models.Model):
    OPPORTUNITY_TYPES = [
        ('JOB', 'Job'),
        ('INTERNSHIP', 'Internship'),
        ('FREELANCE', 'Freelance'),
        ('CONTRACT', 'Contract'),
        ('OTHER', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()
    opportunity_type = models.CharField(max_length=20, choices=OPPORTUNITY_TYPES)
    location = models.CharField(max_length=200)
    is_remote = models.BooleanField(default=False)
    required_skills = models.ManyToManyField(Skill, related_name='opportunities')
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_opportunities')
    posted_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.title} at {self.organization}"

class OpportunityApplication(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('REVIEWING', 'Reviewing'),
        ('SHORTLISTED', 'Shortlisted'),
        ('REJECTED', 'Rejected'),
        ('ACCEPTED', 'Accepted'),
    ]
    
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    applied_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('opportunity', 'applicant')
    
    def __str__(self):
        return f"{self.applicant.get_full_name()} - {self.opportunity.title}"
