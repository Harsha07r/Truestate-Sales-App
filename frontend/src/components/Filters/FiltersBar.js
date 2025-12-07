export default function FiltersBar({ children }) {
  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}
