from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryListCreateView.as_view(), name="category-list"),
    path("tags/", views.SkillTagListCreateView.as_view(), name="tag-list"),
    
    path("hosts/", views.HostListCreateView.as_view(), name="host-list"),
    path("hosts/<int:pk>/", views.HostDetailView.as_view(), name="host-detail"),
    
    path("events/", views.EventListCreateView.as_view(), name="event-list"),
    path("events/<int:pk>/", views.EventDetailView.as_view(), name="event-detail"),
    
    path("competitions/", views.CompetitionListCreateView.as_view(), name="competition-list"),
    path("competitions/<int:pk>/", views.CompetitionDetailView.as_view(), name="competition-detail"),
    
    path("submissions/", views.ChallengeSubmissionListCreateView.as_view(), name="submission-list"),
    path("submissions/<int:pk>/", views.ChallengeSubmissionDetailView.as_view(), name="submission-detail"),
]
