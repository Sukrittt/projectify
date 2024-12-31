import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const protectedRoutes = ["/", "/onboarding", "/room"];

export default clerkMiddleware(async (auth, req) => {
  const isAuthenticated = !!(await auth()).userId;

  const pathname = req.nextUrl.pathname;
  const authPages = ["/sign-in", "/sign-up"];

  if (isAuthenticated && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
