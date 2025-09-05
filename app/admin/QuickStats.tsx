export default function QuickStats() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 bg-dark-accent text-white gap-3 rounded-lg h-auto max-w-sm my-5 mx-14 shadow-md shadow-black font-jetbrains">
            <h2 className="text-xl pb-3 text-center">Macstudio Quick Statistics</h2>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-accent">3</span>
                    <span className="text-lg">Active Projects</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-accent">34</span>
                    <span className="text-lg">Completed Projects</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-accent">75</span>
                    <span className="text-lg">Active Clients</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-accent">134</span>
                    <span className="text-lg">Posts</span>
                </div>
            </div>
        </div>
    );
}