from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'bio',
            'website',
            'profile_image',
        )

        read_only_fields = ['id', 'username', 'email']



class CustomUserSerializer(UserSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'bio', 
            'website', 
            'profile_image'
        )
