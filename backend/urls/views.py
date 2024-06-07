from .models import Url
from .serializers import UrlSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets 
from django.shortcuts import get_object_or_404

class UrlViewSet(viewsets.ViewSet):

    permission_classes = (IsAuthenticated,)


    def list(self, request):
        urls = Url.objects.all().order_by('date_create')
        serializer = UrlSerializer(urls, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Url.objects.all()
        url = get_object_or_404(queryset, pk=pk)
        serializer = UrlSerializer(url)
        return Response(serializer.data)

    def update(self, request, pk=None):
        url = Url.objects.get(pk=pk)
        if request.user != url.user:
            return Response({'message': "No Permission."},
            status=status.HTTP_403_FORBIDDEN)
        serializer = UrlSerializer(url, data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        url = Url.objects.get(pk=pk)
        if request.user != url.user:
            return Response({'message': "No Permission."},
            status=status.HTTP_403_FORBIDDEN)
        url.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserUrlsView (generics.ListAPIView):
    serializer_class = UrlSerializer
    permission_classes = [IsAuthenticated,]
    queryset = Url.objects.all().order_by('date_create')

    def get_queryset(self):
        return super().get_queryset().filter(user=self.kwargs.get('user_id'))