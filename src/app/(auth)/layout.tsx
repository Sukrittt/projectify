export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Clerk captcha */}
      <div id="clerk-captcha" />

      {children}
    </>
  );
}
