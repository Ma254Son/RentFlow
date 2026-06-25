import { Sidebar } from '@/components/admin/sidebar';
import { Navbar } from '@/components/admin/navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-60 flex h-screen flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-24 pb-8">
          <div className="mx-auto max-w-7xl px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
