export default function QuickStats() {
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg font-jetbrains mx-14">
      <h2 className="text-2xl lg:text-3xl text-center mb-6">Macstudio Quick Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">3</div>
          <div className="text-sm text-gray-300">Active Projects</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">34</div>
          <div className="text-sm text-gray-300">Completed Projects</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">75</div>
          <div className="text-sm text-gray-300">Active Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">134</div>
          <div className="text-sm text-gray-300">Blog Posts</div>
        </div>
      </div>
    </div>
  );
}