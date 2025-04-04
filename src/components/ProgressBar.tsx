interface ProgressBarProps {
  progress: number; // 0 to 100
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 h-2 z-50">
      <div 
        className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 