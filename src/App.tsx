import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { AspectRatioImage } from './components/ui/AspectRatioImage';
import dog1 from "@/oneDogFromEachBreed/dog1.jpeg"
import dog2 from "@/oneDogFromEachBreed/dog2.jpeg"
import dog3 from "@/oneDogFromEachBreed/dog3.jpeg"
import dog4 from "@/oneDogFromEachBreed/dog4.jpeg"
import dog5 from "@/oneDogFromEachBreed/dog5.jpeg"
import dog6 from "@/oneDogFromEachBreed/dog6.jpeg"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-1">
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
      <div className='grid grid-cols-2 gap-6'>

        <AspectRatioImage src={dog1} alt="Image" ratio={16/9} /> 


      </div>
        <div className="flex flex-col items-center justify-center">
          <Button className="mb-8 bg-blue-600 hover:bg-blue-700">Click ME RIGHT NOW LIL BRO</Button>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="terms1" className="text-sm text-gray-200 font-medium leading-none peer-disabled:cursor-not">
              Accept terms and conditions
            </label>
            <p className="text-sm text-gray-400">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800">
        <Progress value={33} className="bg-gray-700" />
      </div>
    </div>
  )
}

export default App
