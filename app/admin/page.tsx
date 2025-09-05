import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";

export default function AdminPage() {
  return (
    <div>
      <Header title="Admin Dashboard" button1={<Primary label="Log Out" />} />
    </div>
  );
}

