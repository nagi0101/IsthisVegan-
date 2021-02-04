from django.shortcuts import render
from .models import User, Badge
from django.conf import settings
#from django.contrib.auth.decorators import login_required 

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
