import Notifications from "./Notifications";
import ActionItems from "./ActionItems";

export default function UserPage() {
  return (
    <main className="bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="text-3xl md:text-5xl font-source font-bold pt-4 px-2 text-off-black text-center">
        Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-start items-center justify-center p-1">
        <Notifications />
        <ActionItems />
      </div>
    </main>
  );
}