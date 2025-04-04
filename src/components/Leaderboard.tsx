import React, { useState } from 'react';
import { Dog } from './DogImageGallery';

interface LeaderboardProps {
  dogs: Dog[];
}

export function Leaderboard({ dogs }: LeaderboardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const correctPassword = 'ronald_ryder'; // Set your secure password here

  // Sort dogs by ELO rating in descending order
  const sortedDogs = [...dogs].sort((a, b) => b.eloRating - a.eloRating);

  // Save leaderboard to a .txt file
  const saveLeaderboard = () => {
    const leaderboardText = sortedDogs.map(dog => `Dog ${dog.id + 1}: ${dog.eloRating}`).join('\n');
    const blob = new Blob([leaderboardText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.txt';
    a.click();
    URL.revokeObjectURL(url);
    setIsSaved(true);
  };

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Leaderboard</h2>
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} className="mb-4">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password" 
            className="px-2 py-1 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="ml-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Submit
          </button>
        </form>
      ) : (
        <>
          <ul className="text-gray-200">
            {sortedDogs.map(dog => (
              <li key={dog.id} className="mb-2">
                Dog {dog.id + 1}: {dog.eloRating}
              </li>
            ))}
          </ul>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={saveLeaderboard}
          >
            Save Leaderboard
          </button>
          {isSaved && <p className="mt-2 text-green-400">Leaderboard saved!</p>}
        </>
      )}
    </div>
  );
} 