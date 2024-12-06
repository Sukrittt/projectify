import { AuthForm } from "./_components/auth-form";

export default function SignUp() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-xl space-y-4 px-8 py-4">
        <AuthForm />
      </div>
    </div>
  );
}
