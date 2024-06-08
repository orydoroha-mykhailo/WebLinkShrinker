from django.db import models


class Url(models.Model):
    user = models.ForeignKey('users.User', related_name='urls', on_delete=models.CASCADE)
    date_create = models.DateTimeField(blank=True, null=True)
    url_long = models.TextField(blank=True, null=True)
    url_short = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ('-date_create',)
        db_table = 'url'
