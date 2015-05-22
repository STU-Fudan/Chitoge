from django.test import TestCase

from rest_framework.test import APIRequestFactory

from .models import Article

class APITest(TestCase):

    factory = APIRequestFactory()

    def setUp(self):
        pass

    def test_post(self):
        request = self.factory.post("/Celebration110yr/Chitoge/post", {
            'name': "lancy",
            'year': 2018,
            'content': "坐在自习室里面写代码，我前方三个座位的右边一个座位的那个妹子好萌啊！"
        })

    def test_star(self):
        request = self.factory.post("/Celebration110yr/Chitoge/star", {
            'id': 1
        })

    def test_unstar(self):
        request = self.factory.post("/Celebration110yr/Chitoge/unstar", {
            'id': 1
        })

    def test_get(self):
        request = self.factory.get("/Celebration110yr/Chitoge", {
            'offset': 2
        })

# Create your tests here.
