# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FacilitesPoligonsViewSet, FacilitesPointsViewSet

router = DefaultRouter()
router.register(r'poligons', FacilitesPoligonsViewSet)
router.register(r'points', FacilitesPointsViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
