# Generated by Django 3.2 on 2021-04-26 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0003_auto_20210426_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='files',
            field=models.FileField(upload_to='downloads'),
        ),
    ]
