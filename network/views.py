"""Django Docs

    https://docs.djangoproject.com/en/5.1/topics/http/views/        --> primer on writing views

    https://docs.djangoproject.com/en/5.1/topics/http/shortcuts/    --> shortcut functions commonly used in views.py

    https://docs.djangoproject.com/en/5.1/topics/class-based-views/intro/       --> class-based views

    https://docs.djangoproject.com/en/5.1/topics/class-based-views/generic-display/     --> built-in views

"""

from django.shortcuts import render

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

from .models import User, Reply

import json


class Constants:

    MAX_CHAR = 280


class ErrorMessages: ...


def index(request):
    return HttpResponseRedirect(reverse("network:home"))


def home(request):
    # NOTE:
    # - pending: paginate | limit entries (e.g. 20 + infinite scrolling)

    all_posts = Reply.objects.all()

    context = {"posts": all_posts}
    return render(request, "network/render_template/home.html", context)


@login_required
def create_post(request):

    if request.method == "POST":

        # - get json
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        post_content: str = body["post"]
        # post_type = body["type"]

        # - validate and sanatize
        post_content_tester = (
            post_content.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
        )
        if len(post_content_tester) > Constants.MAX_CHAR:
            # redirect to current url with error message
            ...
        # NOTE:
        # - below is the filter used on template component 'posts/post.html'
        # for appropriate rendering of post content:
        # {% autoescape off %}
        #   <span>{{ post.reply_message|linebreaksbr }}</span>
        # {% endautoescape %}

        # - create new post

        new_reply = Reply(
            replier=request.user,
            reply_message=post_content,
        )
        new_reply.save()

        return JsonResponse({"message": "status: ok"})


@login_required
def create_reply(request): ...


@login_required
def create_quote(request): ...


@login_required
def create_repost(request): ...


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
