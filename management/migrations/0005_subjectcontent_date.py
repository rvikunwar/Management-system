# Generated by Django 3.2 on 2021-04-28 14:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0004_alter_files_files'),
    ]

    operations = [
        migrations.AddField(
            model_name='subjectcontent',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
