import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { DogImageGallery, Dog, DOGS } from '@/components/DogImageGallery';
import { Leaderboard } from '@/components/Leaderboard';
import { expectAndNewRating } from '@/elo';

function App() {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dogs, setDogs] = useState(() => {
    // Load ELO ratings from localStorage
    const savedRatings = localStorage.getItem('dogEloRatings');
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      return DOGS.map(dog => ({ ...dog, eloRating: ratings[dog.id] || dog.eloRating }));
    }
    return DOGS;
  });

  // Save ELO ratings to localStorage whenever they change
  useEffect(() => {
    const ratings: Record<number, number> = dogs.reduce((acc, dog) => {
      acc[dog.id] = dog.eloRating;
      return acc;
    }, {} as Record<number, number>);
    localStorage.setItem('dogEloRatings', JSON.stringify(ratings));
  }, [dogs]);

  // Function to update ELO ratings
  const updateEloRatings = (winnerId: number, loserId: number) => {
    setDogs(prevDogs => {
      const newDogs = [...prevDogs];
      const winner = newDogs.find(dog => dog.id === winnerId);
      const loser = newDogs.find(dog => dog.id === loserId);

      if (winner && loser) {
        const [newWinnerRating, newLoserRating] = expectAndNewRating(winner.eloRating, loser.eloRating, 0);
        winner.eloRating = newWinnerRating;
        loser.eloRating = newLoserRating;
      }

      return newDogs;
    });
  };

  // Example function to update progress
  const updateProgress = () => {
    setProgress(prev => (prev + 10) % 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-white">
      <div className="flex-1 p-4">
        <h1 className="text-lg font-bold mb-6 text-center">click on the dog that would win in a fight </h1>
        
        <div className="max-w-md mx-auto mb-8">
          <DogImageGallery className="rounded-xl" aspectRatio={1} updateEloRatings={updateEloRatings} />
          <p className="text-center mt-3 text-gray-300">Click on the image to see a new dog!</p>
        </div>

       
        <div className="flex items-start space-x-2 mb-8 justify-center">
         
          <div className="grid gap-1.5 leading-none">
            <label htmlFor=" terms1" className="text-sm text-gray-200 font-medium leading-none peer-disabled:cursor-not">
              
            </label>
            <p className="text-sm text-gray-400">
              By using our site, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <Leaderboard dogs={dogs} />
      </div>
      
      <div className="mb-16 px-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl font-bold flex justify-center text-white">
              is this info public?
            </AccordionTrigger>
            <AccordionContent className="text-gray-200">
              yes. all of this information is public.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800">
        <Progress value={progress} className="bg-gray-700" />
      </div>
    </div>
  );
}

export default App;
