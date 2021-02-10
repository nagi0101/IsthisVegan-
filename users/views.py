from django.shortcuts import render, redirect, get_object_or_404
from .models import User, Badge
from django.conf import settings
from django.contrib.auth.decorators import login_required
from .forms import CustomUserChangeForm
from django.contrib.auth.forms import PasswordChangeForm
# import requests
from django.contrib.auth import get_user_model


def login(request):
    return render(request, 'users/login.html')


@login_required
def user_page(request, pk):
    person = get_object_or_404(User, id=pk)
    ctx = {'person': person}
    return render(request, 'users/user_page.html', context=ctx)


@login_required
def user_bookmark(request, pk):
    person = User.objects.get(id=pk)
    bookmarks = person.bookmarks.order_by("created_at")
    ctx = {'bookmarks': bookmarks,
           'person': person}
    return render(request, 'users/user_bookmark.html', context=ctx)


@login_required
def user_mylist(request, pk):
    person = User.objects.get(id=pk)
    mylists = request.user.posts.order_by("created_at")
    ctx = {'mylists': mylists,
           'person': person}
    return render(request, 'users/user_mylist.html', context=ctx)


@login_required
def user_edit(request, pk):
    if request.method == 'POST':
        user_change_form = CustomUserChangeForm(
            request.POST, instance=request.user)
        if user_change_form.is_valid():
            user_change_form.save()
        return redirect('users:user_page', pk)
    else:
        user_change_form = CustomUserChangeForm(instance=request.user)
        person = User.objects.get(id=pk)
        ctx = {'user_change_form': user_change_form,
               'person': person}
        return render(request, 'users/user_edit.html', ctx)


@login_required
def user_delete(request, pk):
    if request.method == 'POST':
        request.user.delete()
        return redirect('posts:post_main')
    else:
        person = User.objects.get(id=pk)
        ctx = {'person': person}
        return render(request, 'users/user_delete.html', ctx)


@login_required
def user_password(request, pk):
    if request.method == 'POST':
        password_change_form = PasswordChangeForm(request.user, request.POST)
        if password_change_form.is_valid():
            password_change_form.save()
            request.user.save()
        return redirect('posts:post_main')
    else:
        password_change_form = PasswordChangeForm(request.user)
        user = request.user
        ctx = {'password_change_form': password_change_form, 'user': user}
        return render(request, 'users/user_password.html', ctx)


def kakao_login(request):
    login_request_uri = 'https://kauth.kakao.com/oauth/authorize?'

    client_id = '5ba76022c7fce339342a1da6fb5aeb9e'
    redirect_uri = 'http://127.0.0.1:8000/oauth'

    login_request_uri += 'client_id=' + client_id
    login_request_uri += '&redirect_uri=' + redirect_uri
    login_request_uri += '&response_type=code'

    request.session['client_id'] = client_id
    request.session['redirect_uri'] = redirect_uri

    return redirect(login_request_uri)


def oauth(request):
    code = request.GET['code']
    print('code =' + str(code))

    return redirect('login')

    # client_id = request.session.get('client_id')
    # redirect_uri = request.session.get('redirect_uri')

    # access_token_request_uri = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&"

    # access_token_request_uri += "client_id=" + client_id
    # access_token_request_uri += "&redirect_uri=" + redirect_uri
    # access_token_request_uri += "&code=" + code

    # print(access_token_request_uri)

    # ACCESS_TOKEN_REQUEST_URI = f'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&code={code}'

    # ACCESS_TOKEN_REQUEST_URI_DATA = requests.get(ACCESS_TOKEN_REQUEST_URI)
    # json_data = ACCESS_TOKEN_REQUEST_URI_DATA.json()
    # access_token = json_data['access_token']

    # print(access_token)

    # user_profile_info_uri = "https://kapi.kakao.com/v2/user/me?access_token="
    # user_profile_info_uri += str(access_token)
    # print(user_profile_info_uri)

    # user_profile_info_uri_data = requests.get(user_profile_info_uri)
    # user_json_data = user_profile_info_uri_data.json()
    # user_nickname = user_json_data['properties']['nickname']

    # print(user_nickname)
