import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addgame() {
  const [game, setGame] = useState({
    name: "",
    details: "",
    tags: [],
    images: [],
    minSpecs: "",
    recSpecs: "",
    purchaseLinks: [],
    price: "",
  });

  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleTagAdd = () => {
    if (tag) {
      setGame({ ...game, tags: [...game.tags, tag] });
      setTag("");
    }
  };

  const handleLinkAdd = () => {
    if (link) {
      setGame({ ...game, purchaseLinks: [...game.purchaseLinks, link] });
      setLink("");
    }
  };

  const handleImageUrlAdd = () => {
    if (imageUrl) {
      setGame({ ...game, images: [...game.images, imageUrl] });
      setImageUrl("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://game-center-react.onrender.com/addgame",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(game),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add game");
      }
      toast.success("Game added successfully!", toastOptions);
      history.back();
    } catch (error) {
      console.error("Error submitting game:", error);
    }
  };

  return (
    <div
      className=" overflow-auto  h-screen flex items-center justify-center relative min-h-screen bg-black bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/neon-light-arrow-direction-perspective_1017-22033.jpg?t=st=1739707808~exp=1739711408~hmac=53cf132011f6a00d81d42a92db44b347a3fb5e65784a8332edaa5b4255077630&w=1380')",
      }}
    >
      <div className="overflow-auto absolute inset-0  bg-opacity-50"></div>

      <div className="relative z-10 max-w-lg mx-auto p-6 bg-gray-900 bg-opacity-50 shadow-lg rounded-lg mt-10 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🎮 Add Game Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Game Name"
            value={game.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            required
          />

          <input
            type="date"
            name="date"
            value={game.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            required
          />

          <textarea
            name="details"
            placeholder="Game Details"
            value={game.details}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            required
          />

          {/* Tags */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add Tag"
                className="flex-grow p-2 border border-gray-700 rounded bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {game.tags.map((t, index) => (
                <span key={index} className="px-2 py-1 bg-blue-700 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Image URL Input */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter Image URL"
                className="flex-grow p-2 border border-gray-700 rounded bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={handleImageUrlAdd}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {game.images.map((t, index) => (
                <span key={index} className="px-2 py-1 bg-green-700 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <textarea
            type="text"
            name="minSpecs"
            placeholder="Minimum Specs"
            value={game.minSpecs}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />

          <textarea
            type="text"
            name="recSpecs"
            placeholder="Recommended Specs"
            value={game.recSpecs}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />

          {/* Purchase Links */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Add Purchase Link"
                className="flex-grow p-2 border border-gray-700 rounded bg-gray-800 text-white"
              />
              <button
                type="button"
                onClick={handleLinkAdd}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {game.purchaseLinks.map((l, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-700 rounded">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={game.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded"
          >
            ➕ Add Game
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
