import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ImageCardProps = {
  src: string;
  alt?: string;
  ratio?: number;
};

export function AspectRatioImage({
  src,
  alt = "Image",
  ratio = 16 / 9,
}: ImageCardProps) {
  return (
    <Card className="max-w-sm mx-auto" style={{ width: '300px', height: '300px', padding: '0px !important'  }}>
      <CardContent className="p-4" style={{ width: '300px', height: '300px', padding: '0px !important'}}>
        <AspectRatio ratio={ratio}>
          <img
style={{ width: '300px', height: '300px'  }}
            src={src}
            alt={alt}
            loading="lazy"
            className="block w-100px h-100px object-cover rounded-xl"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}