export default function EmptyState({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="font-semibold text-gray-700">{title}</p>
      {message && <p className="text-sm text-gray-400 mt-1 max-w-xs">{message}</p>}
    </div>
  )
}