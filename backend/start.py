from web_flask import flask_instance as web_instance
from fs_images import FsImages as ImageWorker

if __name__ == '__main__':
    image_worker = ImageWorker()

    web = web_instance.create_app(image_worker)
    web.run(use_reloader=True, host='0.0.0.0')
