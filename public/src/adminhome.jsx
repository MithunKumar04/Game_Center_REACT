import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeA() {
  const [showTags, setShowTags] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const navigate = useNavigate();

  const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];
  const sortOptions = ["Release Date Asc", "A-Z", "Z-A"];
  const searchData = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango", "Orange"];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        searchData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };


  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between relative">
      {/* Logo & Name */}
      <div className="flex items-center gap-2">
        <img src="/game_center.png" alt="Logo" className="h-20 w-30" />
      </div>

      {/* Tags Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowTags(!showTags)}
          className="px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2"
        >
          Tags <ChevronDown size={18} />
        </button>
        {showTags && (
          <div className="absolute left-0 top-12 w-[500px] h-[50vh] bg-gray-700 p-4 overflow-auto rounded-5">
            <h3 className="text-lg font-semibold mb-2">Available Tags</h3>
            <ul className="grid grid-cols-3 gap-2">
              {tags.map((tag, index) => (
                <li key={index} className="p-2 bg-gray-600 rounded-md">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSort(!showSort)}
          className="px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2"
        >
          Sort <ChevronDown size={18} />
        </button>
        {showSort && (
          <div className="absolute left-0 top-12 w-[200px] h-[20vh] bg-gray-700 p-2 rounded-md">
            <ul>
              {sortOptions.map((option, index) => (
                <li key={index} className="p-2 hover:bg-gray-600 cursor-pointer">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Add Game Button */}
      <button
        onClick={() => navigate("/addgame")}
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Add Game
      </button>


      {/* Search Bar with Results Dropdown */}
      <div className="relative">
        <div className="flex items-center border border-gray-600 rounded-md px-3 py-1 bg-gray-800">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-transparent outline-none px-2 text-white"
          />
        </div>
        {filteredResults.length > 0 && (
          <div className="absolute left-0 mt-1 w-full bg-gray-700 rounded-md shadow-lg max-h-40 overflow-auto">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => alert(`You clicked: ${result}`)}
              >
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => navigate("/loginadmin")}
        className="px-4 py-2 bg-red-600 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}
