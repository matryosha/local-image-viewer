import os
import glob


def glob_search(path, patterns):
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
                glob_search(abs_path_to_dir, ['*.jpeg', '*.jpg', '*.png', '*.gif'])]

    def get_directories_name_in_dir(self, rel_dir_path):
        abs_path_to_dir = os.path.join(self.base_path, rel_dir_path)
        return [os.path.basename(path[:-1]) for path in glob_search(abs_path_to_dir, ['*/'])]
