from django.contrib import admin
from .models import JournalEntry

class JournalAdmin(admin.ModelAdmin):  
  list_display = ('entry_ID', 'user', 'entry', 'date')

# Register your models here.
admin.site.register(JournalEntry, JournalAdmin) 