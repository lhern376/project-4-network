from django.urls import path

from . import views

app_name = "network"
urlpatterns = [
    # ---- render pages
    path("", views.index, name="index"),
    path("home", views.home, name="home"),
    # path("<str:username>", views.profile, name="profile"),
    # path("explore", views.explore, name="explore"),
    # ---- form submit
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    # ---- ajax (json)
    path("post", views.create_post, name="post"),
    path("reply", views.create_reply, name="reply"),
    path("quote", views.create_quote, name="quote"),
    path("repost", views.create_repost, name="repost"),
]
