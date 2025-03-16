from django.db import models

# Create your models here.
class DateMixin(models.Model):
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    
    class Meta:
        abstract = True


class Movie(DateMixin):
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    poster_url = models.URLField()
    rating = models.FloatField()
    
    def __str__(self):
        return self.title
    
