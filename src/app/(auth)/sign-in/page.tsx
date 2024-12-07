import { AuthForm } from "~/app/(auth)/_components/auth-form";

export default function SignUp() {
  return (
    <div className="grid h-screen place-items-center">
      <AuthForm type="sign-in" />
    </div>
  );
}
