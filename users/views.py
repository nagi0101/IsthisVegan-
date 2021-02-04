from django.shortcuts import render, redirect
from .models import User, Badge
from django.conf import settings
#from django.contrib.auth.decorators import login_required 
from .forms import CustomUserChangeForm
from django.contrib.auth.forms import PasswordChangeForm

def login(request):
    return render(request, 'users/login.html')
#@login_required
def user_page(request, pk):
      person= User.objects.get(id=pk)
      ctx = { 'person': person}
      return render(request, 'users/user_page.html', context=ctx)

#@login_required
def user_bookmark(request, pk):
      person= User.objects.get(id=pk)
      bookmarks = person.bookmarks.order_by("created_at")
      ctx = { 'bookmarks': bookmarks,
                'person': person }
      return render(request, 'users/user_bookmark.html', context=ctx)

#@login_required
def user_mylist(request, pk):
      person= User.objects.get(id=pk)
      mylists = request.user.posts.order_by("created_at")
      ctx = { 'mylists': mylists,
                'person': person }
      return render(request, 'users/user_mylist.html', context=ctx)


def user_edit(request,pk):
      if request.method == 'POST':
            user_change_form = CustomUserChangeForm(request.POST, instance=request.user)
            if user_change_form.is_valid():
                  user_change_form.save()
            return redirect('users:user_page',pk)
      else:
            user_change_form = CustomUserChangeForm(instance=request.user)
            ctx = {'user_change_form':user_change_form}
            return render(request,'users/user_edit.html',ctx)

# def user_delete(request,pk):
#       if request.method == 'POST':
#             request.user.delete()
#             return redirect()
      #   return render(request, 'users/user_delete.html')

def user_password(request,pk):
      if request.method == 'POST':
        password_change_form = PasswordChangeForm(request.user, request.POST)
        if password_change_form.is_valid():
            password_change_form.save()
        return redirect('users:user_page',pk)
      else:
        password_change_form = PasswordChangeForm(request.user)
        user = request.user
        ctx= {'password_change_form':password_change_form, 'user':user}
        return render(request, 'users/user_password.html',ctx)
      