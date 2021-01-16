from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import JournalSerializer     
from .models import JournalEntry      
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken        
from datetime import datetime

class JournalView(viewsets.ModelViewSet):      
    serializer_class = JournalSerializer          
    queryset = JournalEntry.objects.all()  

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = JournalEntry.objects.all()
        user = self.request.query_params.get('user', None) 
        month = self.request.query_params.get('month', datetime.now().month) 
        year = self.request.query_params.get('year', datetime.now().year)
        day = self.request.query_params.get('day', None) 
        # localhost:8000/journal/?user=4&month=1&day=2
        if user is not None:
            if day is None:
                #return by month
                return queryset.filter(user=user, date__month=month, date__year=year) 
            else:
                #return a full day 
                return queryset.filter(user=user, date__day=day, date__month=month, date__year=year)
        return 

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
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