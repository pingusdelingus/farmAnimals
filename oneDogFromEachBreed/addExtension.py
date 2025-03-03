import os

for file in os.listdir():
    print(type(file))
    print(file)
    os.system(f"mv ./{file} ./{file}.jpeg")
