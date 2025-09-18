import json
from channels.generic.websocket import AsyncWebsocketConsumer


class EditorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope["url_route"]["kwargs"].get("room_code")
        self.group_name = f"editor_{self.room_code}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            await self.channel_layer.group_send(
                self.group_name, {"type": "broadcast", "message": text_data}
            )

    async def broadcast(self, event):
        await self.send(text_data=event.get("message", ""))

