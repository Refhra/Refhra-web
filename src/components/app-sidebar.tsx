import {
  Calendar,
  ListTodo,
  LineChart,
  Settings,
  BookOpen,
  Smile,
  LayoutDashboard,
  ChevronUp,
  Users,
  Target,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/components/icons/refhra.svg";
import shadcn from "@/components/icons/shadcn.jpg";
import rocket from "@/components/icons/rocket.svg";

import Link from "next/link";
import Image from "next/image";

// Core navigation items for Refhra
const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ListTodo,
  },
  {
    title: "Skill Roadmap",
    url: "/skills",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: LineChart,
  },
  {
    title: "Wellness",
    url: "/wellness",
    icon: Smile,
  },
  {
    title: "Accountability",
    url: "/accountability",
    icon: Users,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Target,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <div className="flex px-4 py-6">
          <Link href="/dashboard" className="flex  gap-2">
            <Image
              src={logo}
              alt="logo"
              width={40} // desired width in pixels
              height={40} // desired height in pixels
            />
            {/* <span className="font-bold text-lg hidden lg:block">Refhra</span> */}
          </Link>
        </div>

        {/* Main Nav */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className=" lg:space-y-2 2xl:space-y-4  ">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 p-2 rounded-lg
                         text-black hover:bg-gray-100 hover:text-black
                         transition-all duration-200 ease-in-out"
                    >
                      <item.icon
                        className="w-6 h-6 lg:!w-6 lg:!h-6
                                    text-gray-700 group-hover:text-black
                                    transition-colors duration-200"
                      />
                      <span className="lg:text-sm sm:text-base font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / Profile */}
      <div className="flex items-center justify-center w-full">
        {/* Upgrade Prompt */}
        <div className="bg-blue-50 xl:hidden 2xl:flex  border text-blue-900 md:h-10 lg:h-32 2xl:h-64  p-3 text-center items-center flex-col flex rounded-lg text-sm font-medium shadow-sm hover:bg-blue-100 transition-colors w-[89%] md:w-full duration-200">
          <Image
            src={rocket}
            alt="logo"
            className="rounded-full  2xl:flex lg:h-fit lg:w-30 md:h-30 md:w-30  h-20 w-20 "
            width={40} // desired width in pixels
            height={40} // desired height in pixels
          />{" "}
          <div className="flex flex-col gap-1">
            <span>Upgrade to Premium</span>
            <span className="text-xs text-blue-700">
              Unlock advanced features and get more out of Refhra
            </span>
          </div>
          <Link
            href="/upgrade"
            className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Upgrade Now
          </Link>
        </div>
      </div>

      <SidebarFooter>
        <SidebarMenu className="mt-10">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-16">
                  <Image
                    src={shadcn}
                    alt="logo"
                    className="rounded-full h-12 w-12 "
                    width={40} // desired width in pixels
                    height={40} // desired height in pixels
                  />{" "}
                  <div className="flex flex-col ">
                    <span>Jane Doe</span>
                    <span>janedoe@gmail.com</span>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
