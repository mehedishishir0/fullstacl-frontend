// components/SidebarLeft.tsx
import {
  PlayCircle,
  BarChart2,
  UserPlus,
  Bookmark,
  Users,
  Gamepad2,
  Settings,
  Save,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const navItems = [
  { icon: PlayCircle, label: "Learning", badge: "New" },
  { icon: BarChart2, label: "Insights" },
  { icon: UserPlus, label: "Find friends" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: Users, label: "Group" },
  { icon: Gamepad2, label: "Gaming", badge: "New" },
  { icon: Settings, label: "Settings" },
  { icon: Save, label: "Save post" },
];

const suggestedPeople = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "/images/people1.png",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
   img: "/images/people2.png",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "/images/people3.png",
  },
];

const events = [
  {
    id: 1,
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: "17 People Going",
  },
  {
    id: 2,
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: "25 People Going", // Second one in your image doesn't show footer yet
  },
];

export default function SidebarLeft() {
  return (
    <div className="flex flex-col mt-5 gap-5 w-full pb-10">
      {/* 1. Explore Section */}
      <Card className=" ring-0  p-4 bg-[#FFFFFF] dark:bg-[#112032]">
        <h2 className="text-xl font-bold mb-3 px-2 dark:text-white">Explore</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-4 h-12 text-[15px] font-medium text-muted-foreground hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group"
            >
              <item.icon className="w-5 h-5 transition-colors" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-[#00D084] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>
      </Card>

      {/* 2. Suggested People Section */}
      <Card className="border-none  p-5 bg-[#FFFFFF] dark:bg-[#112032]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Suggested People</h2>
          <Button
            variant="link"
            className="text-blue-500 h-auto p-0 text-xs font-semibold"
          >
            See All
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          {suggestedPeople.map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={person.img} className="grayscale" />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold leading-tight">
                    {person.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {person.role}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 rounded-md text-[12px] border border-[#DCDFE4] bg-transparent dark:border-[#1890FF] text-[#959EAE] dark:text-white hover:bg-[#377DFF] "
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Events Section */}
      <Card className="border-none shadow-sm p-5 bg-[#FFFFFF] mb-20 dark:bg-[#112032] w-[350px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Events</h2>
          <Button
            variant="link"
            className="text-blue-500 h-auto p-0 text-sm font-semibold hover:no-underline"
          >
            See all
          </Button>
        </div>

        <div className="flex flex-col gap-10 ">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col shadow-md py-4 dark:shadow-none">
              {/* Image Container */}
              <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={event.image}
                  alt="Event Image"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex gap-4 items-start mb-5">
                {/* Green Date Badge */}
                <div className="bg-[#10d876] min-w-[55px] ml-4 h-[55px] rounded-xl flex flex-col items-center justify-center text-white shadow-lg shadow-[#10d876]/20">
                  <span className="text-xl font-bold leading-none">
                    {event.day}
                  </span>
                  <span className="text-sm font-semibold">{event.month}</span>
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-bold leading-tight dark:text-white pt-1">
                  {event.title}
                </h3>
              </div>

              <div className="h-[1px] w-full bg-gray-100 dark:bg-white/10 mb-4" />
              <div className="flex items-center justify-between px-5">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {event.going}
                </span>
                <Button
                  variant="outline"
                  className="border-[1.5px] border-blue-500 hover:bg-[#377DFF]  dark:text-white hover:text-white text-[#1890FF] h-9 px-6 font-bold text-sm bg-transparent"
                >
                  Going
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
