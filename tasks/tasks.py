from celery import shared_task, Task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from datetime import datetime
import random
import math

channel_layer = get_channel_layer()

class CallbackTask(Task):
    def on_success(self, retval, task_id, args, kwargs):
        print(f"Task {task_id} is {retval}")


@shared_task(name="task1", base=CallbackTask)
def task1():
    a = random.randint(1, 50)
    b = random.randint(1, 50)
    result = math.pow(a, b)
    info = {
        'task_name': 'Тестове завдання',
        'result': f"{a}^{b} = {result}",
        'finish time': datetime.now().strftime("%d.%m.%Y %H:%M:%S"),
    }
    async_to_sync(channel_layer.group_send)('tasks', {'type': 'send_task_info', 'data': info})

    return f"{a}^{b} = {result}"
