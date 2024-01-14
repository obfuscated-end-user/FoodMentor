import os
import re
import requests

cwd = os.path.dirname(os.path.realpath(__file__))+ "\\filipino_food"

print(cwd)

files = [f for f in os.listdir(cwd) if os.path.isfile(os.path.join(cwd, f))]
print(files[1][:-4])

for file in files:
    path = f"{cwd}\\{file[:-4]}"
    if not os.path.exists(path):
        os.makedirs(path)

def download_images():
    for file in files:
        print(file)
        with open(f"{cwd}\\{file}", "r", encoding="utf8") as f:
            lines = [line for line in f.readlines() if line.strip()]
            for line in lines:
                url = line.strip()
                file_name = re.compile("([A-Za-z0-9_\-]{58})", ).search(url).group(1)
                if os.path.exists(f"{cwd}\\{file[:-4]}\\{file_name}.jpg"):
                    print(f"{file[:-4]}\\{file_name}.jpg already exists.")
                else:
                    with open(f"{cwd}\\{file[:-4]}\\{file_name}.jpg", "wb") as img:
                        response = requests.get(url)
                        if len(response.content) > 100:
                            img.write(response.content)
                            print(f"{file[:-4]}\\{file_name}.jpg successfully added.")
                        else:
                            print(f"{file[:-4]}\\{file_name}.jpg is too small.")

def delete_garbage():
    for file in files:
        path = f"{cwd}\\{file[:-4]}"
        for img in os.listdir(path):
            if os.path.getsize(f"{path}\\{img}") < 100:
                print(f"deleted {path}\\{img}.")
                os.remove(f"{path}\\{img}")
            else:
                pass

# download_images()
delete_garbage()

# ([A-Za-z0-9_\-]{11})