from rest_framework import serializers
from .models import Url

class UrlSerializer(serializers.HyperlinkedModelSerializer):
    #user_id = '6b0aec5de7d94892b240abe9f8584da8'

    user = serializers.ReadOnlyField(source='user.id')
    date_create = serializers.DateTimeField()
    url_long = serializers.CharField()
    url_short = serializers.CharField()
    class Meta:
        model = Url
        fields = ['id', 'date_create', 'user', 'url_long', 'url_short']

