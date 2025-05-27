# serializers.py
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import FacilitesPoligons, FacilitesPoints


class FacilitesPoligonsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FacilitesPoligons
        geo_field = "geom"
        fields = ("id", "name", "description", "geom")


class FacilitesPointsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FacilitesPoints
        geo_field = "geom_point"
        fields = ("id", "name", "description", "geom_point")