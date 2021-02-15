from django.shortcuts import render

# Create your views here.

def offline(request):
    return render(request, "offline.html")