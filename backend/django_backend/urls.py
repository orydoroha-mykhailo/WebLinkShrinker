from django.contrib import admin
from django.urls import path, include
from urls import views as UrlsViews
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Blog API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register(r'urls', UrlsViews.UrlViewSet, basename="urls")

urlpatterns = [
   path('', include(router.urls)),
   path('users/', include('users.urls')),
   path('api/urls/<str:user_id>/', UrlsViews.UserUrlsView.as_view()),
   path('admin/', admin.site.urls),
   path('api/', include('users.urls', namespace='users')),
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]