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


class User(AbstractUser):
    pass
