"use client";
import {
  Gamepad2,
  Home,
  Key,
  Lightbulb,
  LogOut,
  MessageCircle,
  Newspaper,
  NotebookText,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { CustomToolTip } from "~/components/ui/custom-tool-tip";

export const Sidebar = () => {
  const pathname = usePathname();

  const services = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    {
      label: "Matchmaking",
      href: "/matchmaking",
      icon: <Gamepad2 className="h-4 w-4" />,
    },
    {
      label: "Challenges",
      href: "/challenges",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      label: "Feed",
      href: "/feed",
      icon: <Newspaper className="h-4 w-4" />,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="h-4 w-4" />,
    },
    {
      label: "Developer Diary",
      href: "/diary",
      icon: <NotebookText className="h-4 w-4" />,
    },
  ];

  return (
    <div className="mr-2 flex flex-col gap-y-6 rounded-xl border px-2 py-4">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className={cn(
            "grid h-9 w-9 place-items-center rounded-full border transition hover:border-ring",
            {
              "border-ring": pathname === service.href,
            },
          )}
        >
          <CustomToolTip text={service.label}>{service.icon}</CustomToolTip>
        </Link>
      ))}

      <ManageUser />
    </div>
  );
};

const ManageUser = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      setLoading(true);

      if (user) await signOut();
      else redirect("/sign-in");
    } catch (e) {
      console.log("Error", e);

      toast.error("Oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleSignOut}
      className={cn(
        "mt-auto grid h-9 w-9 place-items-center rounded-full border transition hover:border-ring",
        {
          "cursor-default opacity-60": loading,
        },
      )}
    >
      <CustomToolTip text={loading ? "Loading" : user ? "Logout" : "Sign in"}>
        {loading ? (
          <LoaderDot className="pb-0" dotClassName="bg-black" />
        ) : user ? (
          <LogOut className="h-4 w-4" />
        ) : (
          <Key className="h-4 w-4" />
        )}
      </CustomToolTip>
    </div>
  );
};
