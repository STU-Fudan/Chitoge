from django.shortcuts import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

def index(request):
    if request.user.is_active is False:
        if not request.session.exists(request.session.session_key):
            request.session.create()
        user = User.objects.create_user(
            username=request.session._get_session_key(),
            password='Anniversary110yr'
        )
        user = authenticate(username=request.session._get_session_key(), password="Anniversary110yr")
        login(request, user)

    with open('templates/index.html', 'rb') as f:
        s = f.read()

    return HttpResponse(s)

def articles(request):
    if request.user.is_active is False:
        if not request.session.exists(request.session.session_key):
            request.session.create()
        user = User.objects.create_user(
            username=request.session._get_session_key(),
            password='Anniversary110yr'
        )
        user = authenticate(username=request.session._get_session_key(), password="Anniversary110yr")
        login(request, user)

    with open('templates/articles.html', 'rb') as f:
        s = f.read()

    return HttpResponse(s)