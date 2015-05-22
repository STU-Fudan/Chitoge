from rest_framework import serializers

from .models import Article

class ArticleSerializers(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'name', 'year', 'content', 'image', 'created_at', 'starCount')
        read_only_fields = ('starCount', )
