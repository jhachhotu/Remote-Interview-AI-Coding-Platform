from django.db import models
from django.conf import settings


class Interview(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    scheduled_at = models.DateTimeField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="created_interviews")
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="interviews")
    room_code = models.CharField(max_length=16, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:  # pragma: no cover
        return f"Interview({self.title})"

