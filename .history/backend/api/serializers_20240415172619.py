from rest_framework import serializers
from .models import User, Parent, Child, Session, Break, Task, Category, Goal, Contains, Has, PerformanceReport

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class BreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Break
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['task_id', 'user_id', 'name']  # Update the field name here

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class ContainsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contains
        fields = '__all__'

class HasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Has
        fields = '__all__'

class PerformanceReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceReport
        fields = '__all__'