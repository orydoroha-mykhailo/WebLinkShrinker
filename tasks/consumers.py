import json
from channels.generic.websocket import AsyncWebsocketConsumer


class TasksConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add('tasks', self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard('tasks', self.channel_name)

    async def send_task_info(self, event):
        task_info = event['data']
        await self.send(json.dumps(task_info))