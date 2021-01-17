from django.shortcuts import render
from rest_framework import viewsets, filters       
from .serializers import JournalSerializer     
from .models import JournalEntry      
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken   
from django.db.models import Avg, Max, Min     
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class JournalView(viewsets.ModelViewSet):      
    serializer_class = JournalSerializer
    queryset = JournalEntry.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'entry'];  

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL. 

        Can search by title and entries with ?serach=search,queries,and,so,on
        """
        queryset = JournalEntry.objects.all()
        month = self.request.query_params.get('month', datetime.now().month) 
        year = self.request.query_params.get('year', datetime.now().year)
        day = self.request.query_params.get('day', None)
        # localhost:8000/journal/?user=4&month=1&day=2
        if self.request.user.is_authenticated:
            if self.request.user.id == 1:
                if day is None:
                    #return by month
                    return queryset.filter(date__month=month, date__year=year) 
                else:
                    #return a full day 
                    return queryset.filter(date__day=day, date__month=month, date__year=year)
            else:
                if day is None:
                    #return by month
                    return queryset.filter(user=self.request.user, date__month=month, date__year=year) 
                else:
                    #return a full day 
                    return queryset.filter(user=self.request.user, date__day=day, date__month=month, date__year=year)
        return

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    logger.warning(request.user) 
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       