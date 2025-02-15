import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Addgame() {
  const [game, setGame] = useState({
    name: "",
    details: "",
    tags: [],
    images: [], // Now stores an array of image URLs
    minSpecs: "",
    recSpecs: "",
    purchaseLinks: [],
    price: "",
  });

  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for image URL input
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
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
      setImageUrl(""); // Clear input after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://game-center-react.onrender.com/addgame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });

      if (!response.ok) {
        throw new Error("Failed to add game");
      }
      toast.error("Email and Password is required.", toastOptions);
      history.back()
      
      console.log("Game added successfully!");
    } catch (error) {
      console.error("Error submitting game:", error);
    }
  };

  return (
    <>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Game Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Game Name" value={game.name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={game.date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <textarea name="details" placeholder="Game Details" value={game.details} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        
        <div>
          <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Add Tag" className="p-2 border rounded" />
          <button type="button" onClick={handleTagAdd} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Add Tag</button>
          <div className="mt-2 flex flex-wrap gap-2">
            {game.tags.map((t, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded">{t}</span>
            ))}
          </div>
        </div>

        {/* Image URL input instead of file upload */}
        <div>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Enter Image URL" className="p-2 border rounded w-full" />
          <button type="button" onClick={handleImageUrlAdd} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Add Image</button>
        </div>

        {/* Display added image URLs */}
        <div className="mt-2 flex flex-wrap gap-2">
          {game.images.map((t, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 rounded" >{t}</span>
          ))}
        </div>

        <textarea type="text" name="minSpecs" placeholder="Minimum Specs" value={game.minSpecs} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <textarea type="text" name="recSpecs" placeholder="Recommended Specs" value={game.recSpecs} onChange={handleInputChange} className="w-full p-2 border rounded" />

        <div>
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Add Purchase Link" className="p-2 border rounded" />
          <button type="button" onClick={handleLinkAdd} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Add Link</button>
          <div className="mt-2 flex flex-wrap gap-2">
            {game.purchaseLinks.map((l, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded">{l}</span>
            ))}
          </div>
        </div>

        <input type="text" name="price" placeholder="Price" value={game.price} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Add Game</button>
      </form>
    </div>
    <ToastContainer />
    </>
  );
}
