from django.contrib.gis.db import models


class FacilitesPoligons(models.Model):
    name = models.CharField(max_length=80, null=True)
    description = models.CharField(max_length=167, null=True)

    geom = models.PolygonField(srid=4326)

    class Meta:
        indexes = [models.Index(fields=["geom"], name="geom_index")]


class FacilitesPoints(models.Model):
    name = models.CharField(max_length=80, null=True)
    description = models.CharField(max_length=167, null=True)

    geom_point = models.PointField(srid=4326)

    class Meta:
        indexes = [models.Index(fields=["geom_point"], name="geom_point_index")]