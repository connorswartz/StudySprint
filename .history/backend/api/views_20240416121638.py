from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Parent, Child, Session, Break, Task, Category, Goal, Contains, Has, PerformanceReport
from .serializers import UserSerializer, ParentSerializer, ChildSerializer, SessionSerializer, BreakSerializer, TaskSerializer, CategorySerializer, GoalSerializer, ContainsSerializer, HasSerializer, PerformanceReportSerializer
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'success': True, 'user_id': user.user_id})
    else:
        return Response({'success': False})

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    account_type = request.data.get('accountType')
    parent_username = request.data.get('parentUsername')
    
    # Check if the username or email is already registered
    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'message': 'Username already exists'})
    if User.objects.filter(email=email).exists():
        return Response({'success': False, 'message': 'Email already registered'})
    
    # Create a new user
    user = User.objects.create(username=username, email=email)
    user.set_password(password)
    user.save()
    
    if account_type == 'child':
        # Check if the parent user exists
        try:
            parent_user = User.objects.get(username=parent_username)
            parent = Parent.objects.get(user_id=parent_user)
            Child.objects.create(user_id=user, parent_id=parent)
        except (User.DoesNotExist, Parent.DoesNotExist):
            user.delete()  # Delete the created user if the parent doesn't exist
            return Response({'success': False, 'message': 'Invalid parent username'})
    else:
        Parent.objects.create(user_id=user)
    
    return Response({'success': True, 'user_id': user.user_id})

def home(request):
    return render(request, 'home.html') # Add this function

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

    def perform_create(self, serializer):
        # Generate a unique session_id
        session_id = 1
        while True:
            try:
                # Check if the session_id already exists
                Session.objects.get(session_id=session_id)
                session_id += 1  # If it exists, increment the session_id
            except Session.DoesNotExist:
                # If the session_id doesn't exist, use it and break the loop
                break
            except IntegrityError:
                # Handle race condition where another session was created with the same session_id
                session_id += 1
                continue

                
        serializer.save(session_id=session_id)

class BreakViewSet(viewsets.ModelViewSet):
    queryset = Break.objects.all()
    serializer_class = BreakSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset

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