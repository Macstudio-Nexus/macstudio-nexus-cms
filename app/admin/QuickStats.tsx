export default function QuickStats() {
  return (
    <div className="dashboard-card-container max-w-3/4">
      <h2 className="text-2xl lg:text-3xl text-center mb-4">Macstudio Quick Statistics</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="flex flex-col xl:flex-row justify-center items-center gap-6 flex-1 mb-4 sm:mb-0">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">3</div>
            <div className="text-sm text-gray-300">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">34</div>
            <div className="text-sm text-gray-300">Completed Projects</div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-6 flex-1">
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
    </div>
  );
}