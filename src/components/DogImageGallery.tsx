import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { expectAndNewRating } from '@/elo';

// Dog class to represent each dog with an ELO rating
export class Dog {
  constructor(public id: number, public imagePath: string, public eloRating: number = 1600) {}
}

// Array of dog instances
export const DOGS = Array.from({ length: 118 }, (_, i) => new Dog(i, `/src/oneDogFromEachBreed/dog${i + 1}.jpeg`));

interface DogImageGalleryProps {
  className?: string;
  aspectRatio?: number;
  updateEloRatings: (winnerId: number, loserId: number) => void;
}

export function DogImageGallery({ 
  className, 
  aspectRatio = 16 / 9,
  updateEloRatings
}: DogImageGalleryProps) {
  const [currentDogs, setCurrentDogs] = useState<[Dog, Dog]>([DOGS[0], DOGS[1]]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacities, setOpacities] = useState<[number, number]>([1, 1]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set([0, 1]));

  // Select a new random dog that hasn't been shown before
  const getNewUniqueDog = (): Dog => {
    if (usedIndices.size >= DOGS.length - 3) {
      const currentlyDisplayed = new Set(currentDogs.map(dog => dog.id));
      setUsedIndices(currentlyDisplayed);
    }

    let newDog;
    do {
      const newIndex = Math.floor(Math.random() * DOGS.length);
      newDog = DOGS[newIndex];
    } while (
      usedIndices.has(newDog.id)
    );

    return newDog;
  };

  // Handle image click to update ELO ratings
  const handleImageClick = (clickedIndex: 0 | 1) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Determine the winner and loser
    const winner = currentDogs[clickedIndex];
    const loser = currentDogs[1 - clickedIndex];

    // Update ELO ratings using the provided function
    updateEloRatings(winner.id, loser.id);

    // Update the opacities for animation
    const newOpacities: [number, number] = [...opacities] as [number, number];
    newOpacities[1 - clickedIndex] = 0;
    setOpacities(newOpacities);
    
    setTimeout(() => {
      // Replace the loser with a new dog
      const newDog = getNewUniqueDog();
      const newDogs: [Dog, Dog] = [...currentDogs] as [Dog, Dog];
      newDogs[1 - clickedIndex] = newDog;
      setCurrentDogs(newDogs);

      // Mark the new dog as used
      setUsedIndices(prev => new Set([...prev, newDog.id]));

      // Fade the new image in
      setTimeout(() => {
        const updatedOpacities: [number, number] = [...opacities] as [number, number];
        updatedOpacities[1 - clickedIndex] = 1;
        setOpacities(updatedOpacities);
        setIsTransitioning(false);
      }, 50);
    }, 300); // Wait for fade-out animation to complete
  };

  // Select random images on component mount
  useEffect(() => {
    const availableIndices = Array.from({ length: DOGS.length }, (_, i) => i);
    const shuffled = [...availableIndices].sort(() => 0.5 - Math.random());
    const initialDogs: [Dog, Dog] = [DOGS[shuffled[0]], DOGS[shuffled[1]]];
    
    setCurrentDogs(initialDogs);
    setUsedIndices(new Set(initialDogs.map(dog => dog.id)));
  }, []);

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {[0, 1].map((position) => (
        <Card 
          key={position}
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleImageClick(position as 0 | 1)}
        >
          <CardContent className="p-0">
            <div 
              className="relative" 
              style={{ paddingBottom: `${100 / aspectRatio}%` }}
            >
              <img
                src={currentDogs[position].imagePath}
                alt={`Dog ${currentDogs[position].id + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                style={{ opacity: opacities[position] }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 