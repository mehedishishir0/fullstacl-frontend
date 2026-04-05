
import { Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const friendsList = [
  { name: "Steve Jobs", role: "CEO of Apple", time: "5 minute ago", online: false, img: "/images/people1.png" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", online: true, img: "/images/people2.png" },
  { name: "Dylan Field", role: "CEO of Figma", online: true, img: "/images/people3.png" },
  { name: "Steve Jobs", role: "CEO of Apple", time: "5 minute ago", online: false, img: "/images/people1.png" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", online: true, img: "/images/people2.png" },
  { name: "Dylan Field", role: "CEO of Figma", online: true, img: "/images/people3.png" },
];

export default function SidebarRight() {
  return (
    <div className="flex flex-col gap-5 mt-5 w-full pb-10">
      
  
      <Card className="border-none  dark:bg-[#112032] bg-white  p-5 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-textPrimary">You Might Like</h2>
          <Button variant="link" className="text-primary h-auto p-0 text-sm font-semibold">
            See All
          </Button>
        </div>

        <div className="flex flex-col  text-center gap-4 border-t border-[#DFDFDF]  pt-6">
         <div className="flex items-center gap-5">
           <Avatar className="h-16 w-16">
            <AvatarImage src="/images/Avatar.png" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-lg font-bold text-textPrimary">
              Radovan SkillArena
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Founder & CEO at Trophy
            </p>
          </div>
         </div>
          
          <div className="flex w-full gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1 rounded-md h-11  border border-[#DCDFE4] bg-transparent hover:bg-[#377DFF]  dark:border-[#1890FF] text-[#959EAE] dark:text-white    "
            >
              Ignore
            </Button>

            <Button className="flex-1 rounded-md h-11 bg-[#377DFF]  hover:opacity-90 text-white font-bold">
              Follow
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-none shadow-custom p-5 dark:bg-[#112032] bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-textPrimary">
            Your Friends
          </h2>

          <Button variant="link" className="text-primary h-auto p-0 text-sm font-semibold">
            See All
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />

          <Input
            placeholder="Search friends..."
            className="pl-11 h-12 bg-input border-none bg-[#F5F5F5] dark:bg-[#232E42] rounded-full placeholder:text-textMuted"
          />
        </div>

        <div className="flex flex-col gap-6">
          {friendsList.map((friend, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage
                    src={friend.img}
                    className="grayscale brightness-110"
                  />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="text-[15px] font-bold leading-tight text-textPrimary">
                    {friend.name}
                  </span>

                  <span className="text-[11px] text-textSecondary mt-0.5">
                    {friend.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                {friend.online ? (
                  <div className="w-2.5 h-2.5 bg-[#0ACF83] rounded-full border border-white" />
                ) : (
                  <span className="text-[11px] text-textMuted font-medium">
                    {friend.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}