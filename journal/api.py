from .models import JournalEntry
from rest_framework import viewsets, permissions
from .serializers import JournalSerializer

class JournalViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = JournalSerializer