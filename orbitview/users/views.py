from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import CustomUser
from .serializers import CustomUserSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class CustomLoginAPIView(APIView):

    permission_classes = []

    def post(self, request):
        username_or_email = request.data.get("username_or_email")
        password = request.data.get("password")

        # Check if the provided "username_or_email" is a username or an email
        user = None
        if '@' in username_or_email:  # It's an email
            user = CustomUser.objects.filter(email=username_or_email).first()
        else:  # It's a username
            user = CustomUser.objects.filter(username=username_or_email).first()

        if user is not None and user.check_password(password):
            # Create JWT tokens
            
            # fetch the user who just logged in
            profile = get_object_or_404(CustomUser, user__username=user.username)

            return Response(profile, status=status.HTTP_200_OK)
    
        
        print("Login FAILED!")
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)