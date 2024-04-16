from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('api', 'backend/api/migrations/0008_remove_task_priority.py'),  # Replace with the previous migration name
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=0),
        ),
    ]
