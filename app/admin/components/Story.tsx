import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import React from "react";

interface StoryProps {
  story: string | null;
  txtcolor: string;
}

function Story({ story, txtcolor }: StoryProps) {
  return (
    <Card className="relative flex w-full max-w-[380px] items-center justify-center border-none bg-left p-0 text-center backdrop-blur-2xl">
      <CardContent className="relative h-full w-full rounded-[12px] bg-black/50 p-8">
        
        {/* Top-left quote */}
        <Quote
          className="absolute -left-2 -top-2 h-10 w-10 opacity-30"
          strokeWidth={1.5}
        />

        {/* Story */}
        <span
          className="relative z-10 block p-4 text-lg font-medium leading-8"
          style={{ color: txtcolor }}
        >
          {story}
        </span>

        {/* Bottom-right quote */}
        <Quote
          className="absolute -bottom-2 -right-2 h-10 w-10 rotate-180 opacity-30"
          strokeWidth={1.5}
        />

      </CardContent>
    </Card>
  );
}

export default Story;