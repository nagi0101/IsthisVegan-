from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import AskPost
from .forms import AskPostForm

def ask_product_create(request):

    if request.method == "GET":
        form = AskPostForm()

        ctx = {
            "form": form,
        }
    
        return render(request, "reports/ask_product_create.html", ctx)
    else:
        form = AskPostForm(request.POST)

        if form.is_valid():
            askpost = form.save(commit=False)
            askpost.user = request.user
            askpost.save()
            pk = askpost.id

    return redirect(f"/")

