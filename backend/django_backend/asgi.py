import os

from chat.consumers import ChatConsumer
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing
import tasks.routing
# import chat.routing
# import tasks.routing
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            # chat.routing.websocket_urlpatterns
            # + tasks.routing.ws_urpatterns,
            # tasks.routing.ws_urpatterns
            tasks.routing.ws_urpatterns
        )
    ),
})
