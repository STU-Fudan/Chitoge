from .models import Article
from .serializers import ArticleSerializers

from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions


class StarView(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, id):
        try:
            article = request.user.starred_articles.get(id=id)
        except Exception:
            try:
                article = Article.objects.get(id=id)
                article.starCount = article.starCount + 1
                article.save()
                request.user.starred_articles.add(article)
                request.user.save()
                return Response({'detail': 'OK', 'starCount': article.starCount})
            except Exception:
                raise Http404
        else:
            return Response({'detail': 'You have starred it before.'}, status=403)

class UnstarView(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, id):
        try:
            article = request.user.starred_articles.get(id=id)
            request.user.starred_articles.remove(article)
            request.user.save()
            article.starCount = article.starCount - 1
            article.save()
            return Response({'detail': 'OK', 'starCount': article.starCount})
        except Exception as e:
            raise e
            return Response({'detail': "You didn't star this article"})



class ArticleList(generics.ListAPIView):

    lookup_url_kwarg = ['offset', 'field']

    serializer_class = ArticleSerializers

    def get_queryset(self):
        offset = self.request.query_params['offset']
        offset = int(offset)
        field = self.request.query_params['field']
        return Article.objects.order_by('-' + field)[offset:offset + 6]


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializers
    permission_classes = [
        permissions.AllowAny
    ]
    lookup_field = 'id'

    def get_queryset(self):
        return Article.objects.all()


class CreateArticle(generics.CreateAPIView):
    serializer_class = ArticleSerializers
    permissions_classes = [
        permissions.AllowAny
    ]
