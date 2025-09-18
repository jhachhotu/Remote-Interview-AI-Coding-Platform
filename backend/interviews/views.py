from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Interview
from .serializers import InterviewSerializer


class InterviewViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all().order_by("-created_at")
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["get"])  # /api/interviews/mine/
    def mine(self, request):
        qs = self.get_queryset().filter(participants=request.user)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

