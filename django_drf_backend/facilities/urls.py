# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FacilitesPoligonsViewSet

router = DefaultRouter()
router.register(r'poligons', FacilitesPoligonsViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
