import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";

export default function AdminPage() {
  return (
    <>
      <div>
        <Header title="Admin Dashboard" button1={<Primary label="Log Out" />} />
      </div>
      <main className="bg-gradient-to-r from-white to-primary min-h-screen">
        <div className="flex items-center justify-center p-1">
          <h1 className="text-xl font-source pt-4">Content Management System</h1>
        </div>
      </main>
    </>
  );
}
