# Generated by Django 5.0.3 on 2024-04-15 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_task_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='task_name',
            field=models.CharField(max_length=100),
        ),
    ]
