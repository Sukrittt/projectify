import Link from "next/link";

import { AuthForm } from "~/app/(auth)/_components/auth-form";

export default function SignUp() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-xl space-y-2 px-8 py-4">
        <AuthForm />

        <p className="text-[13px] text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-foreground">
            <span>Sign in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
