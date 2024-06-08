from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    UrlViewSet,
)

app_name = 'urls'

urlpatterns = [
    path('urls/', UrlViewSet.as_view()),
]