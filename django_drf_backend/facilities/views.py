# views.py
from rest_framework import viewsets
from .serializers import FacilitesPoligonsSerializer, FacilitesPointsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import FacilitesPoligons, FacilitesPoints
from .serializers import FacilitesPointsSerializer
from rest_framework.decorators import action


class FacilitesPoligonsViewSet(viewsets.ModelViewSet):
    queryset = FacilitesPoligons.objects.all()
    serializer_class = FacilitesPoligonsSerializer

    @action(detail=True, methods=["get"], url_path="points_inside")
    def points_inside(self, request, pk=None):
        polygon = self.get_object()
        points = FacilitesPoints.objects.filter(geom_point__within=polygon.geom)
        serializer = FacilitesPointsSerializer(points, many=True)
        return Response(serializer.data)

class FacilitesPointsViewSet(viewsets.ModelViewSet):
    queryset = FacilitesPoints.objects.all()
    serializer_class = FacilitesPointsSerializer
