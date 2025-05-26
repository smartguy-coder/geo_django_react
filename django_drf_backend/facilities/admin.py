from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import FacilitesPoligons, FacilitesPoints


class FacilitiesAdmin(LeafletGeoAdmin):
    list_display = ("name", "description")


admin.site.register(FacilitesPoligons, FacilitiesAdmin)
admin.site.register(FacilitesPoints, FacilitiesAdmin)
