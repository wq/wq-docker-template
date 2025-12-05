from wq.db import rest
from .models import Category, Observation
from .serializers import ObservationSerializer


rest.router.add_page(
    "index",
    dict(url=""),
)

rest.router.register_model(
    Category,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Observation,
    serializer=ObservationSerializer,
    cache="first_page",
    vector_tile_fields=["date", "category_id", "photo"]
)
