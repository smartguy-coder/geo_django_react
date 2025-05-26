from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import FacilitesPoligons


class FacilitiesAdmin(LeafletGeoAdmin):
    list_display = ("name", "description")



admin.site.register(FacilitesPoligons, FacilitiesAdmin)
