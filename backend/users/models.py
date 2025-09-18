from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        CANDIDATE = "candidate", "Candidate"
        INTERVIEWER = "interviewer", "Interviewer"
        ADMIN = "admin", "Admin"

    role = models.CharField(max_length=32, choices=Role.choices, default=Role.CANDIDATE)

