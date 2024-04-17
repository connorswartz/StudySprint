from datetime import timezone
import datetime
from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Parent, Child, Session, Break, Task, Category, Goal, Contains, Has, PerformanceReport
from api.serializers import UserSerializer, ParentSerializer, ChildSerializer, SessionSerializer, BreakSerializer, TaskSerializer, CategorySerializer, GoalSerializer, ContainsSerializer, HasSerializer, PerformanceReportSerializer
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError
from decimal import Decimal
from django.db.models import Sum
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import F
from django.utils import timezone

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

    @action(detail=True, methods=['patch'])
    def update_email(self, request, pk=None):
        user = self.get_object()
        email = request.data.get('email')
        if email:
            user.email = email
            user.save()
            return Response({'success': True})
        return Response({'success': False, 'message': 'Email is required'})

    @action(detail=True, methods=['patch'])
    def update_password(self, request, pk=None):
        user = self.get_object()
        password = request.data.get('password')
        if password:
            user.set_password(password)
            user.save()
            return Response({'success': True})
        return Response({'success': False, 'message': 'Password is required'})

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        date = self.request.query_params.get('date')
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        if date is not None:
            queryset = queryset.filter(date=date)
        return queryset

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

        session = serializer.save(session_id=session_id)
        print(f"New session created: {session}")

        # Update the goal's completed minutes
        user_id = session.user_id.user_id
        today = timezone.now().date()
        sessions = Session.objects.filter(user_id=user_id, date=today)
        print(f"Sessions for user {user_id} on {today}: {sessions}")
        completed_seconds = sum(session.starttime - session.endtime for session in sessions)
        print(f"Completed seconds for user {user_id} on {today}: {completed_seconds}")
        completed_minutes = Decimal(completed_seconds) / Decimal(60)
        print(f"Completed minutes for user {user_id} on {today}: {completed_minutes}")

        try:
            goal = Goal.objects.filter(user_id=user_id).latest('goal_id')
            goal.completed_minutes = completed_minutes
            goal.save()
            print(f"Updated goal {goal.goal_id} for user {user_id} with completed minutes: {completed_minutes}")
        except Goal.DoesNotExist:
            print(f"No goal found for user {user_id}")

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

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def perform_create(self, serializer):
        goal = serializer.save(completed_minutes=0)
        user_id = goal.user_id.user_id
        today = timezone.now().date()
        sessions = Session.objects.filter(user_id=user_id, date=today)
        completed_seconds = sum(session.starttime - session.endtime for session in sessions)
        completed_minutes = Decimal(completed_seconds) / Decimal(60)
        goal.completed_minutes = completed_minutes
        goal.save()

    def perform_update(self, serializer):
        user_id = serializer.validated_data['user_id'].user_id
        today = timezone.now().date()
        sessions = Session.objects.filter(user_id=user_id, date=today)
        print(f"Sessions for user {user_id} on {today}: {sessions}")
        completed_seconds = sum(session.starttime - session.endtime for session in sessions)
        print(f"Completed seconds for user {user_id} on {today}: {completed_seconds}")
        completed_minutes = completed_seconds // 60
        print(f"Completed minutes for user {user_id} on {today}: {completed_minutes}")
        serializer.save(completed_minutes=completed_minutes)
        print(f"Updated goal for user {user_id} with completed minutes: {completed_minutes}")

class ContainsViewSet(viewsets.ModelViewSet):
    queryset = Contains.objects.all()
    serializer_class = ContainsSerializer

class HasViewSet(viewsets.ModelViewSet):
    queryset = Has.objects.all()
    serializer_class = HasSerializer

class PerformanceReportViewSet(viewsets.ModelViewSet):
    queryset = PerformanceReport.objects.all()
    serializer_class = PerformanceReportSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        if start_date is not None and end_date is not None:
            queryset = queryset.filter(date__range=[start_date, end_date])
        return queryset

    @action(detail=False, methods=['get'])
    def duration_by_date(self, request):
        user_id = request.query_params.get('user_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if user_id is None or start_date is None or end_date is None:
            return Response({'error': 'user_id, start_date, and end_date are required.'}, status=400)

        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

        durations = Session.objects.filter(
            user_id=user_id,
            date__range=[start_date, end_date]
        ).annotate(
            duration=F('endtime') - F('starttime')
        ).values('date').annotate(
            total_duration=Sum('duration')
        ).values('date', 'total_duration')

        durations_data = [
            {
                'date': duration['date'],
                'duration': duration['total_duration']
            }
            for duration in durations
        ]

        return Response(durations_data)