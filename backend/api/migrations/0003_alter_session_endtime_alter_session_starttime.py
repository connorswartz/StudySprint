# Generated by Django 5.0.3 on 2024-04-16 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_session_date_session_task_id_task_completed_sessions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='endtime',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='session',
            name='starttime',
            field=models.IntegerField(),
        ),
    ]
