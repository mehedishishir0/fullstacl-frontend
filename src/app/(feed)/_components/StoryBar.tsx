import { Plus } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const stories = [
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl2.png",
    userImg: "/images/mini_pic.png",
  },
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl3.png",
    userImg: "/images/mini_pic.png",
  },
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl4.png",
    userImg: "/images/mini_pic.png",
  },
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl3.png",
    userImg: "/images/mini_pic.png",
  },
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl3.png",
    userImg: "/images/mini_pic.png",
  },
  {
    name: "Ryan Roslansky",
    image: "/images/card_ppl3.png",
    userImg: "/images/mini_pic.png",
  },
];

export default function StoryBar() {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full mb-6"
    >
      <CarouselContent className="gap-4">
        {/* Your Story */}
        <CarouselItem className="basis-[120px] md:basis-[140px]">
          <div className="relative h-[170px] md:h-[180px] rounded-[15px] overflow-hidden cursor-pointer group shadow-sm">
            <div className="h-[70%] overflow-hidden">
              <Image
                width={140}
                height={130}
                src="/images/card_ppl1.png"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                alt="Your Story"
              />
            </div>

            <div className="absolute bottom-0 w-full h-[35%] bg-[#112032] flex flex-col items-center justify-end pb-3">
              <div className="absolute top-0 -translate-y-1/2 p-1 bg-[#0b141e] rounded-full border-[3px] border-background">
                <div className="bg-blue-500 rounded-full p-1">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>

              <span className="text-white text-[12px] font-bold">
                Your Story
              </span>
            </div>
          </div>
        </CarouselItem>

        {stories.map((story, i) => (
          <CarouselItem key={i} className="basis-[120px] md:basis-[140px]">
            <div className="relative h-[170px] md:h-[180px] rounded-[15px] overflow-hidden cursor-pointer shadow-sm group">
              <Image
                width={140}
                height={130}
                src={story.image}
                className="object-cover w-full h-full"
                alt={story.name}
              />

     
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3 p-0.5 bg-blue-500 rounded-full border-2 border-white">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={story.userImg} />
                </Avatar>
              </div>

              <span className="absolute bottom-3 left-3 right-3 text-white text-[12px] font-bold truncate">
                {story.name}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
