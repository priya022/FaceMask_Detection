from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Photo(models.Model):
    title = models.CharField(max_length=100)  # this field does not use in your project
    img = models.ImageField(upload_to='media/')