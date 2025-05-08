from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'role')


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'bio', 'website', 'profile_image')
