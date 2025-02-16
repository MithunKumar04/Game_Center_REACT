import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeA() {
  const [showTags, setShowTags] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [games, setGames] = useState([]);
  const [sortedGames, setSortedGames] = useState([]);

  const navigate = useNavigate();
  const sortOptions = ["A-Z", "Z-A", "Recent Date Desc"];

  // Fetch Games & Tags using a single GET request
  useEffect(() => {
    fetch("https://game-center-react.onrender.com/games") // Update with your actual API
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        // Extract unique tags from all games
        const allTags = [...new Set(data.flatMap((game) => game.tags))];
        setTags(allTags);

        // Sort games by Recent Date (Descending) initially
        setSortedGames(
          [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle Sorting
  const handleSort = (option) => {
    let sorted = [...games];
    if (option === "A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "Z-A") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "Recent Date Desc") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setSortedGames(sorted);
  };

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        games.filter((game) =>
          game.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Handle Tag Click (Filter Games by Tag)
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const filteredGames = games.filter((game) => game.tags.includes(tag));
    setSortedGames(filteredGames);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
        <img src="https://dypdvfcjkqkg2.cloudfront.net/large/1485049-182.png" alt="image" className="h-20 w-30" />
        </div>

        {/* Tags Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTags(!showTags)}
            className="px-4 py-2 bg-gray-700 rounded-lg flex items-center gap-2"
          >
            Tags <ChevronDown size={18} />
          </button>
          {showTags && (
            <div className="absolute left-0 top-12 w-[500px] h-[50vh] bg-gray-700 p-4 overflow-auto rounded-md">
              <h3 className="text-lg font-semibold mb-2">Available Tags</h3>
              <ul className="grid grid-cols-3 gap-2">
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-600 rounded-md cursor-pointer hover:bg-gray-500"
                    onClick={() => handleTagClick(tag)}
                  >
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
            className="px-4 py-2 bg-gray-700 rounded-lg flex items-center gap-2"
          >
            Sort <ChevronDown size={18} />
          </button>
          {showSort && (
            <div className="absolute left-0 top-12 w-[200px] bg-gray-700 p-2 rounded-md">
              <ul>
                {sortOptions.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSort(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center border border-gray-600 rounded-md px-3 py-1 bg-gray-700">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent outline-none px-2 text-white"
            />
          </div>

          {/* Search Results Dropdown */}
          {filteredResults.length > 0 && (
            <div className="absolute left-0 mt-2 w-[300px] bg-gray-700 rounded-md p-2 shadow-lg">
              {filteredResults.map((game) => (
                <div
                  key={game._id}
                  className="p-2 hover:bg-gray-600 cursor-pointer rounded-md"
                  onClick={() => navigate(`/game/${game.name}`)}
                >
                  {game.name}
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

      {/* Main Content - Game Cards */}
      <div
        className="d-flex h-screen w-screen  "
        style={{
          backgroundImage:
            "url('https://wallpaperbat.com/img/11552946-black-and-red-gaming-wallpaper-on.jpg')",
        }}
      >
        <div className="p-8 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">
            {selectedTag ? `Games with Tag: ${selectedTag}` : "Available Games"}
          </h2>

          {/* Grid layout for game cards */}
          <div className="grid grid-cols-3 gap-6">
            {sortedGames.map((game) => (
              <div
                key={game._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
                onClick={() => navigate(`/game/${game.name}`)}
              >
                {/* Game Image */}
                <img
                  src={
                    game.images.length > 0 ? game.images[0] : "/placeholder.jpg"
                  } // Show first image or a placeholder
                  alt={game.name}
                  className="w-full h-70 object-cover rounded-md mb-2"
                />

                {/* Game Name */}
                <h3 className="text-lg font-semibold">{game.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
