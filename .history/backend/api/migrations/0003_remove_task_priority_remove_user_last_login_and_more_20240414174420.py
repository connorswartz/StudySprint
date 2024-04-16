# Generated by Django 5.0.3 on 2024-04-14 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_user_groups_remove_user_is_active_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='last_login',
        ),
        migrations.AddField(
            model_name='task',
            name='task_name',
            field=models.CharField(default='Untitled Task', max_length=100),
        ),
    ]