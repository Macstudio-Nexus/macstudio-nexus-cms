export default function ClientProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="z-50 fixed bottom-20 bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-3/4 w-7/8 shadow-lg">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-2xl font-jetbrains font-bold text-dark">Add Client Project</h2>

        <form className="flex flex-col gap-4 w-3/4">
        
        </form>
          

        <button className="button py-1 px-4 bg-dark text-white hover:bg-dark-accent border-dark" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
