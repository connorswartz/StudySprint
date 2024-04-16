from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        if not email:
            raise ValueError('The Email field must be set')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    last_login = None  # This attempts to negate the default field from AbstractBaseUser

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.username



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