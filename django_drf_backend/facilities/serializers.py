# serializers.py
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import FacilitesPoligons, FacilitesPoints


class FacilitesPoligonsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FacilitesPoligons
        geo_field = "geom"  # Вказуємо поле геометрії
        fields = ("id", "name", "description", "geom")


class FacilitesPointsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FacilitesPoints
        geo_field = "geom_point"  # Вказуємо поле геометрії
        fields = ("id", "name", "description", "geom_point")