import { Sidebar } from "./_components/sidebar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen gap-x-2 p-4">
      <Sidebar />
      <div className="h-full grow">{children}</div>
    </div>
  );
}
