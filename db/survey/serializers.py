from wq.db.rest.serializers import ModelSerializer
from rest_framework import serializers
from .models import Observation


class ObservationSerializer(ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Observation
        fields = "__all__"
        list_exclude = ["geometry"]
        wq_field_config = {
            "notes": {"multiline": True},
        }
