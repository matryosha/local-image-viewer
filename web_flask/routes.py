from flask import Blueprint, jsonify
from flask.helpers import send_file


def create_default_blueprint(static_folder, image_worker):
    bp = Blueprint('default', __name__, static_folder)

    @bp.route('/')
    def index():
        return bp.send_static_file('index.html')

    @bp.route('/get-image/<path:image_relative_path>')
    def get_image(image_relative_path):
        return send_file(image_worker.get_image_full_path(image_relative_path))

    @bp.route('/get-current-dir-image-names-recursively')
    def get_images_name_in_dir_recursively():
        images_names = image_worker.get_images_name_in_current_dir_recursively()
        return jsonify(images_names)

    @bp.route('/get-dir-content/', defaults={'rel_dir_path': ''})
    @bp.route('/get-dir-content/<path:rel_dir_path>')
    def get_dir_content(rel_dir_path):
        return jsonify(image_worker.get_dir_content(rel_dir_path))

    return bp

