import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-y-2 p-4">
      <div className="flex justify-end">
        <Link href="/sign-up" className={cn(buttonVariants(), "w-fit")}>
          Get Started
        </Link>
      </div>

      {children}
    </div>
  );
}
