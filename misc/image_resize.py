from PIL import Image
import os

food = input("enter valid food: ")
path = os.path.dirname(os.path.realpath(__file__)) + f"\\{food}"
dirs = os.listdir(path)

def resize(im, new_width):
    width, height = im.size
    ratio = height / width
    new_height = int(ratio * new_width)
    resized_image = im.resize((new_width, new_height))
    return resized_image

files = os.listdir(path)
extensions = ["jpg", "jpeg", "png", "gif", "webp"]

for file in files:
    ext = file.split(".")[-1]
    if ext in extensions:
        im = Image.open(f"{path}\{file}")
        im = im.convert("RGB")
        im_resized = resize(im, 300)
        if not os.path.exists(f"{path}\\resized"):
            os.makedirs(f"{path}\\resized")
        filepath = f"{path}\\resized\{file}"
        im_resized.save(filepath)