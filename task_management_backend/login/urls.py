from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
