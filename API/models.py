from django.db import models


class Article(models.Model):

    # primary key
    id = models.AutoField(primary_key=True)

    # for post
    name = models.CharField(max_length=128)
    year = models.CharField(max_length=128)
    content = models.TextField()
    image = models.ImageField(null=True, blank=True)

    # autocreated
    created_at = models.DateTimeField(auto_now_add=True)

    # other state
    starCount = models.IntegerField(default=0)
    starrer = models.ManyToManyField('auth.User', related_name="starred_articles")

    class Meta:
        ordering = ('-created_at',)
