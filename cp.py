import random
import os
def main():
    cwd = os.getcwd()
    allBreedsPath = f"{cwd}/Images"
    oneDogFromEachBreedPath = f"{cwd}/oneDogFromEachBreed"
    
    index = 0 
    for dogBreedFolder in os.listdir(allBreedsPath):
        print(dogBreedFolder)
        print(type(dogBreedFolder))
        currFolder = dogBreedFolder
        currFolderPath = f"{allBreedsPath}/{currFolder}"
#        print(currFolderPath)
        
        currPictures = os.listdir(currFolderPath)
#        print(currPictures)
#        print(type(currPictures))
        #working up until 
#        print()
        print()


        files = [f for f in currPictures ]
        print(files)
        print(type(files))


        randomPhotoIndex = random.randint(0, len(files) - 1)
        chosen = files[randomPhotoIndex]
        chosenPath = f"{currFolderPath}/{str(chosen)}"
#        print(f"chosenPath :{chosenPath}")

        #copy chosen into new folder
        dest =  f"{oneDogFromEachBreedPath}/dog{index}"
        command = f"cp {chosenPath} {dest}"
        index += 1
        os.system(command)
        
        print(f"File copied from {chosenPath} to {dest}")

main()











