"""
URL configuration for backend project.
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import: from my_app import views
    2. Add a URL to urlpatterns: path('', views.home, name='home')
Class-based views
    1. Add an import: from other_app.views import Home
    2. Add a URL to urlpatterns: path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns: path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from api import views
from api.views import login_view, register_view

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'parents', views.ParentViewSet)
router.register(r'children', views.ChildViewSet)
router.register(r'sessions', views.SessionViewSet)
router.register(r'breaks', views.BreakViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'goals', views.GoalViewSet)
router.register(r'contains', views.ContainsViewSet)
router.register(r'has', views.HasViewSet)
router.register(r'performance-reports', views.PerformanceReportViewSet)

urlpatterns = [
    path('', views.home, name='home'), 
    path('api/', include(router.urls)),
    path('api/login/', login_view, name='login'),
    path('api/register/', register_view, name='register'),
]
