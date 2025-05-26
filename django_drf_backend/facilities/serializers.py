# serializers.py
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import FacilitesPoligons


class FacilitesPoligonsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FacilitesPoligons
        geo_field = "geom"  # Вказуємо поле геометрії
        fields = ("id", "name", "description", "geom")
