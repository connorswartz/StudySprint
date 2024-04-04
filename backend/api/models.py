from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

class Parent(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_id = models.AutoField(primary_key=True)

class Child(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    child_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey(Parent, on_delete=models.CASCADE)

class Session(models.Model):
    session_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    starttime = models.DateTimeField()
    endtime = models.DateTimeField()

class Break(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)
    duration = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    priority = models.IntegerField()
    report_id = models.ForeignKey('PerformanceReport', on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Category(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class Goal(models.Model):
    goal_id = models.AutoField(primary_key=True)
    progress = models.IntegerField()
    no_of_sessions = models.IntegerField()
    deadline = models.DateField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Contains(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class Has(models.Model):
    goal_id = models.ForeignKey(Goal, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class PerformanceReport(models.Model):
    report_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)