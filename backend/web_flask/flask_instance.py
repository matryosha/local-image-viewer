import os

from flask import Flask
from flask_cors import CORS
from . import routes


def create_app(image_worker, test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DEBUG=True,
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    default_bp = routes.create_default_blueprint(
        app.static_folder,
        image_worker)
    app.register_blueprint(default_bp)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app
