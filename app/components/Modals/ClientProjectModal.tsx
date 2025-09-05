export default function ClientProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="z-50 fixed bottom-20 bg-gray bg-opacity-50 flex items-center justify-center h-3/4 w-7/8 shadow-lg">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-2xl font-jetbrains font-bold text-dark">Add Client Project</h2>
        <button className="bg-dark rounded-lg px-4 py-2 text-white" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
