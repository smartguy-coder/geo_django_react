# views.py
from rest_framework import viewsets
from .models import FacilitesPoligons
from .serializers import FacilitesPoligonsSerializer


class FacilitesPoligonsViewSet(viewsets.ModelViewSet):
    queryset = FacilitesPoligons.objects.all()
    serializer_class = FacilitesPoligonsSerializer
