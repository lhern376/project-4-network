from django.urls import path

from . import views

app_name = "network"
urlpatterns = [
    path("", views.index, name="index"),
    path("home", views.home, name="home"),
    # path("<str:username>", views.profile, name="profile"),
    # path("explore", views.explore, name="explore"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
]
