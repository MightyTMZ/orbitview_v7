from rest_framework import generics, permissions
from .models import CustomUser
from .serializers import CustomUserSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user