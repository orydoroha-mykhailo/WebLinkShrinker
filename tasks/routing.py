from django.urls import path
from .consumers import TasksConsumer

ws_urpatterns = [
    path('ws/tasks_info/', TasksConsumer.as_asgi())
]