from django.db import models
from django.conf import settings

# Create your models here.

class JournalEntry(models.Model):
    # Fields
    entry_ID = models.AutoField(primary_key=True)
    title = models.CharField(max_length=250, default="")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    entry = models.TextField(max_length=25000)
    avg_mood = models.IntegerField(default=-1)
    sleep = models.IntegerField(default=-1)
    exercise = models.IntegerField(default=-1)
    down_time = models.IntegerField(default=-1)
    healthy_eating = models.IntegerField(default=-1)
    date = models.DateTimeField(auto_now_add=True)


