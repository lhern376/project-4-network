"""Django Docs

    https://docs.djangoproject.com/en/5.1/topics/http/views/        --> primer on writing views

    https://docs.djangoproject.com/en/5.1/topics/http/shortcuts/    --> shortcut functions commonly used in views.py

    https://docs.djangoproject.com/en/5.1/topics/class-based-views/intro/       --> class-based views

    https://docs.djangoproject.com/en/5.1/topics/class-based-views/generic-display/     --> built-in views

"""

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Reply


def index(request):
    return HttpResponseRedirect(reverse("network:home"))


def home(request):
    # NOTE:
    # - pending: paginate | limit entries (e.g. 20 + infinite scrolling)

    all_posts = Reply.objects.all()

    context = {"posts": all_posts}
    return render(request, "network/render_template/home.html", context)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("network:index"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("network:index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("network:index"))
    else:
        return render(request, "network/register.html")
