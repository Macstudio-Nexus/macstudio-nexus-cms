export function LoginFooter() {
  return (
    <div className="w-full p-2 bg-dark">
      <p className="font-jetbrains text-sm text-center text-white">
        &copy; {new Date().getFullYear()} Macstudio Nexus. All rights reserved.
      </p>
    </div>
  );
}

export function Footer() {
  return <footer className="w-full py-4 bg-gray-100"></footer>;
}
