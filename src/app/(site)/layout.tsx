import { GetStarted } from "./_components/get-started";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-y-2 p-4">
      <GetStarted />
      {children}
    </div>
  );
}
