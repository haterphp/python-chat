# Router
from os import path


API_PREFIX = "/api/{0}"

# Fronted application
COMMON_STATIC_DIR = "view/dist"

STATIC_ASSETS_PATH = path.join(COMMON_STATIC_DIR, "assets")
STATIC_ASSETS_ROUTEPATH = "/assets"

STATIC_HTML_FILEPATH = path.join(COMMON_STATIC_DIR, "index.html")

# Database
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"