from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0007_auto_20230415_0011'),  # Replace with the previous migration name
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=0),
        ),
    ]
