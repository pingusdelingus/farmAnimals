import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";


type ImageCardProps ={
  src: string;
  alt?: string;
  ratio?: number
};

export function AspectRatioImage( { src, alt = "Image", ratio = 16 / 9}: ImageCardProps){
return (
    <Card className="max-w-sm mx-auto">
        <CardContent className="p-4">
            <AspectRatio ratio={ratio}>
                <img
                src={src}
                alt={alt}
                
                className="rounded-xl object-cover w-full h-full"
           /> 
            </AspectRatio>

        </CardContent>
    </Card>
);
}
    
