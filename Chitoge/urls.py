from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from API import api
from API import views

urlpatterns = [
    # Examples:
    # url(r'^$', 'Chitoge.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    # index
    url(r'^Anniversary110yr/Chitoge/$', views.index),

    # articles
    url(r'^Anniversary110yr/Chitoge/articles/$', views.articles),

    # ReST API
    # url(r'^Anniversary110yr/Chitoge/article/(?P<id>\d+)', api.ArticleDetail.as_view()),
    url(r'^Anniversary110yr/Chitoge/article/create', api.CreateArticle.as_view()),
    url(r'^Anniversary110yr/Chitoge/article/list', api.ArticleList.as_view()),
    url(r'^Anniversary110yr/Chitoge/star/(?P<id>\d+)/$', api.StarView.as_view()),
    url(r'^Anniversary110yr/Chitoge/unstar/(?P<id>\d+)/$', api.UnstarView.as_view()),

    # static files
] + static(settings.STATICS_URL, document_root=settings.STATICS_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
