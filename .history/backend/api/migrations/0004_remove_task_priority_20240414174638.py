# Generated by Django 5.0.3 on 2024-04-14 23:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_task_priority_remove_user_last_login_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='priority',
        ),
    ]