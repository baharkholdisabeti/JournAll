# Generated by Django 3.1.5 on 2021-01-16 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='journalentry',
            name='avg_mood',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='journalentry',
            name='down_time',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='journalentry',
            name='exercise',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='journalentry',
            name='healthy_eating',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='journalentry',
            name='sleep',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='journalentry',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
