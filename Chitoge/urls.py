from django.conf.urls import include, url
from django.contrib import admin

from API import api

urlpatterns = [
    # Examples:
    # url(r'^$', 'Chitoge.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    # ReST API
    url(r'^Anniversary110yr/Chitoge/article/(?P<id>\d+)', api.ArticleDetail.as_view()),
    # url(r'^Anniversary110yr/Chitoge/article/create', api.CreateArticle.as_view()),
    url(r'^Anniversary110yr/Chitoge/article/list/', api.ArticleList.as_view()),
    url(r'^Anniversary110yr/Chitoge/star/(?P<id>\d+)/', api.StarView.as_view()),
]


