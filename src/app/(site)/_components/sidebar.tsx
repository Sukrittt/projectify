"use client";
import {
  Gamepad2,
  Home,
  Key,
  Lightbulb,
  Loader2,
  LogOut,
  MessageCircle,
  Newspaper,
  NotebookText,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { toast } from "~/hooks/use-toast";
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
    <div className="mx-4 flex flex-col gap-y-6 rounded-xl border p-4">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className={cn(
            "grid h-9 w-9 place-items-center rounded-full border transition hover:border-neutral-500",
            {
              "border-neutral-500": pathname === service.href,
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

  const handleUserAuth = async () => {
    try {
      setLoading(true);

      if (user) await signOut();
      else redirect("/sign-in");
    } catch (e) {
      console.log("Error", e);

      toast({
        title: "Uh oh! Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleUserAuth}
      className={cn(
        "mt-auto grid h-9 w-9 place-items-center rounded-full border transition hover:border-neutral-500",
        {
          "cursor-default opacity-60": loading,
        },
      )}
    >
      <CustomToolTip text={loading ? "Loading" : user ? "Logout" : "Sign in"}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : user ? (
          <LogOut className="h-4 w-4" />
        ) : (
          <Key className="h-4 w-4" />
        )}
      </CustomToolTip>
    </div>
  );
};
