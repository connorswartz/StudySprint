from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Parent, Child, Session, Break, Task, Category, Goal, Contains, Has, PerformanceReport
from .serializers import UserSerializer, ParentSerializer, ChildSerializer, SessionSerializer, BreakSerializer, TaskSerializer, CategorySerializer, GoalSerializer, ContainsSerializer, HasSerializer, PerformanceReportSerializer

def home(request):
    return render(request, 'home.html')  # Add this function

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class BreakViewSet(viewsets.ModelViewSet):
    queryset = Break.objects.all()
    serializer_class = BreakSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class ContainsViewSet(viewsets.ModelViewSet):
    queryset = Contains.objects.all()
    serializer_class = ContainsSerializer

class HasViewSet(viewsets.ModelViewSet):
    queryset = Has.objects.all()
    serializer_class = HasSerializer

class PerformanceReportViewSet(viewsets.ModelViewSet):
    queryset = PerformanceReport.objects.all()
    serializer_class = PerformanceReportSerializer