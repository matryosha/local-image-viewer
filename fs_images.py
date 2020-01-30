import os
import glob


def _glob_search(path, patterns):
    result = []

    for pattern in patterns:
        result.extend(glob.glob(path + pattern))

    return result


class FsImages:
    def __init__(self, base_path=os.curdir):
        self.current_relative_dir = ''
        self._init_start_path(base_path)

    def _init_start_path(self, base_path):
        self.base_path = os.path.abspath(base_path)

        if not os.path.isdir(self.base_path):
            raise FileNotFoundError('Start path does not exist or not a directory')

    def get_images_name_in_current_dir(self):
        return [path.replace(self.base_path, '') for path in
                _glob_search(self.get_current_dir_abs_path(), ['*.jpeg', '*.jpg', '*.png', '*.gif'])]

    def get_images_name_in_current_dir_recursively(self):
        return [path.replace(self.base_path, '') for path in
                _glob_search(self.get_current_dir_abs_path(), ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.gif'])]

    def get_image_full_path(self, image_relative_path):
        return os.path.join(self.base_path, image_relative_path)

    def image_exists_in_current_dir(self, image_name):
        path_to_image = os.path.join(self.base_path, self.current_relative_dir, image_name)
        return os.path.isfile(path_to_image)

    def get_current_dir_abs_path(self):
        return os.path.join(self.base_path, self.current_relative_dir)

    def change_current_dir(self, new_dir):
        new_abs_path = os.path.join(self.base_path, new_dir)

        if not os.path.isdir(new_abs_path):
            raise FileNotFoundError(f'Cant change directory to {new_abs_path}')

        self.current_relative_dir = new_dir

    def get_current_dir_content(self):
        dir_path = self.get_current_dir_abs_path()
        current_dir_items = os.listdir(dir_path)
        result_items = []
        for item in current_dir_items:
            result_items.append({"name": f'{item}', "isFile": os.path.isfile(os.path.join(dir_path, item))})

        return result_items

    def get_dir_content(self, rel_dir_path):
        """
        :param rel_dir_path: Relative directory path to base path
        :return: images file and directories
        """
        if rel_dir_path != '':
            rel_dir_path = f'{rel_dir_path}/'

        img_files = [{"name": f'{img_name}', "isFile": True} for img_name in self.get_images_name_in_dir(rel_dir_path)]
        directories = [{"name": f'{dir_name}', "isFile": False} for dir_name in
                       self.get_directories_name_in_dir(rel_dir_path)]

        return img_files + directories

    def get_images_name_in_dir(self, rel_dir_path):
        abs_path_to_dir = os.path.join(self.base_path, rel_dir_path)
        return [os.path.basename(path) for path in
                _glob_search(abs_path_to_dir, ['*.jpeg', '*.jpg', '*.png', '*.gif'])]

    def get_directories_name_in_dir(self, rel_dir_path):
        abs_path_to_dir = os.path.join(self.base_path, rel_dir_path)
        return [os.path.basename(path[:-1]) for path in _glob_search(abs_path_to_dir, ['*/'])]
