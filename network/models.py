"""Django Docs

    https://docs.djangoproject.com/en/5.1/topics/db/                        --> All topics for models and databases

    https://docs.djangoproject.com/en/5.1/topics/db/models/                 --> Models (NOTE: Start here)

    https://docs.djangoproject.com/en/5.1/ref/models/fields/#field-types    --> field types

    https://docs.djangoproject.com/en/5.1/ref/models/fields/#field-options  --> field options

    https://docs.djangoproject.com/en/5.1/ref/models/options/               --> Models' internal class Meta and the options you can pass to it (like 'ordering')

    https://docs.djangoproject.com/en/5.1/topics/db/queries/#related-objects    --> related objects (ie. foreign key, ManyToMany field)

    https://docs.djangoproject.com/en/5.1/topics/db/examples/                   --> examples of how to use related objects

    https://docs.djangoproject.com/en/5.1/ref/models/relations/                 --> related object reference page


    https://docs.djangoproject.com/en/5.1/topics/db/queries/                    --> making queries (NOTE: more useful for views.py)

    https://docs.djangoproject.com/en/5.1/ref/models/querysets/#field-lookups   --> field lookups (NOTE: more useful for views.py)

    https://docs.djangoproject.com/en/5.1/ref/models/querysets/                 --> QuerySet ref page


"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    """Model representing a User"""

    date_joined = models.DateField(auto_now=True, help_text="Date joined")

    # they are subscribed to me
    followers = models.ManyToManyField(
        "User",
        blank=True,
        help_text="Following user",
        related_name="following_user",
    )

    # track with logic
    num_followers = models.IntegerField(default=0)

    # i'm subscribed to
    following = models.ManyToManyField(
        "User",
        blank=True,
        help_text="Followed by user",
        related_name="followed_by_user",
    )

    # track with logic
    num_following = models.IntegerField(default=0)

    likes = models.ManyToManyField(
        "Reply",
        blank=True,
        help_text="Liked posts",
        related_name="users_who_liked",
    )

    def __str__(self):
        return self.username

    def get_followers(self):
        return self.followers.all()

    def get_following(self):
        return self.following.all()


class Reply(models.Model):
    """Model representing a Post/Reply"""

    replier = models.ForeignKey(
        User, null=True, on_delete=models.PROTECT, related_name="replies"
    )

    replying_to = models.ForeignKey(
        "Reply", null=True, blank=True, on_delete=models.PROTECT, related_name="replies"
    )

    types_of_replies = [
        ("OP", "original post"),
        ("Reply", "reply"),
    ]

    reply_type = models.CharField(
        max_length=5, choices=types_of_replies, default="OP", help_text="Type of reply"
    )

    # track with logic
    num_likes = models.IntegerField(default=0)

    reply_message = models.CharField(max_length=280, help_text="What is happening!?")

    # track with logic
    num_direct_replies = models.IntegerField(default=0)

    reply_date = models.DateTimeField(default=timezone.now)

    # track with logic
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"Reply '{self.id}' from user {self.replier.username}"

    class Meta:
        ordering = ["-reply_date"]
