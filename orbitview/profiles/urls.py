from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'skills', views.SkillViewSet)
router.register(r'user-skills', views.UserSkillViewSet, basename='user-skill')
router.register(r'achievements', views.AchievementViewSet, basename='achievement')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'timeline', views.CareerTimelineViewSet, basename='timeline')
router.register(r'opportunities', views.OpportunityViewSet, basename='opportunity')
router.register(r'applications', views.OpportunityApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
] 