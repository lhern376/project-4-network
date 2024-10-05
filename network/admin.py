# https://docs.djangoproject.com/en/5.1/intro/tutorial07/

from django.contrib import admin

from .models import User, Reply

# Register your models here.


class ReplyInline(admin.TabularInline):
    model = Reply
    extra = 1


class UserAdmin(admin.ModelAdmin):
    # fields = [
    #     "username",
    #     "first_name",
    #     "last_name",
    #     "followers",
    #     "num_followers",
    #     "following",
    #     "num_following",
    #     "likes",
    # ]

    search_fields = ["username"]
    list_filter = ["date_joined", "num_following"]

    list_display = [
        "username",
        "date_joined",
        "num_followers",
        "num_following",
    ]

    fieldsets = [
        (
            "Personal Info",
            {
                "fields": [
                    "username",
                    "first_name",
                    "last_name",
                    "password",
                ]
            },
        ),
        (
            "Additional Info",
            {
                "fields": [
                    "followers",
                    "num_followers",
                    "following",
                    "num_following",
                    "likes",
                ]
            },
        ),
    ]

    inlines = [ReplyInline]


admin.site.register(User, UserAdmin)
admin.site.register(Reply)
