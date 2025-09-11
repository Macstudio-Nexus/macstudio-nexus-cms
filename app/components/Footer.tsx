export default function Footer() {
  return (
    <div className="w-full p-2 bg-dark">
      <p className="font-jetbrains text-sm text-center text-white">
        &copy; {new Date().getFullYear()} Macstudio Nexus. All rights reserved.
      </p>
    </div>
  );
}
