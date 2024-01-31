from django.db import models

class Task(models.Model):
    user = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateField()
    completed = models.CharField(max_length=100)

    def __str__(self):
        return self.title