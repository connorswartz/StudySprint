from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone

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

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    completed_sessions = models.IntegerField(default=0)

class Session(models.Model):
    session_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, default=1)  # Provide a default value for task_id
    starttime = models.IntegerField()  # Store starttime in seconds
    endtime = models.IntegerField() # Store endtime in seconds
    date = models.DateField(default=timezone.now)

class Break(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)
    duration = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Category(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class Goal(models.Model):
    goal_id = models.AutoField(primary_key=True)
    no_of_minutes = models.IntegerField()
    completed_minutes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Contains(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class Has(models.Model):
    goal_id = models.ForeignKey(Goal, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

class PerformanceReport(models.Model):
    report_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    duration = models.IntegerField(default=0)