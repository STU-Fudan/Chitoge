from django.shortcuts import HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.middleware import csrf

def index(request):
    if 'csrf_token' not in request.GET:
        added_query_string = '?csrf_token=%s' if len(request.GET) == 0 else '&csrf_token=%s'
        return redirect(request.get_full_path() + added_query_string % (csrf._get_new_csrf_key()))
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
    if 'csrf_token' not in request.GET:
        added_query_string = '?csrf_token=%s' if len(request.GET) == 0 else '&csrf_token=%s'
        return redirect(request.get_full_path() + added_query_string % (csrf._get_new_csrf_key()))
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