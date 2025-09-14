import { Search, X } from "lucide-react";

interface SearchBoxProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export default function SearchBox({ searchText, onSearchTextChange }: SearchBoxProps) {
  return (
    <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="Görevlerinizde arama yapın..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
        {searchText && (
          <button
            onClick={() => onSearchTextChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}