import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Gamepage() {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/games/${name}`)
            .then((response) => {
                console.log("Game Data:", response.data); // ✅ Check if releaseDate exists
                setData(response.data);
            })
            .catch((error) => console.error("Error fetching game data:", error));
    }, [name]);

    if (!data) return <div className="flex justify-center items-center h-screen text-xl text-white">Loading...</div>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className="relative w-full min-h-screen">
            {/* Fixed Background */}
            <div 
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data.images[0]})` }}
            />

            {/* Scrollable Content with Transparent Background */}
            <div className="relative z-10 flex flex-col items-center text-white p-6 min-h-screen overflow-auto backdrop-blur-sm">
                <div className="w-3/4 max-w-3xl text-center mt-10 bg-black bg-opacity-50 p-6 rounded-lg">
                    <h1 className="text-4xl font-bold mb-2">{data.name}</h1>

                    {/* Release Date */}
                    <p className="text-gray-300 text-sm mb-4">
                        Released on: {data.date ? new Date(data.date).toDateString() : "Unknown"}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {data.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Image Carousel */}
                    <Slider {...settings} className="mb-4">
                        {data.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Screenshot ${index}`} className="w-full h-100 object-cover rounded-lg" />
                            </div>
                        ))}
                    </Slider>

                    {/* Game Details */}
                    <h5 className="mb-20 test-start">Details: {data.details}</h5><br />


                    <div className="overflow-auto">
    <table className="w-full border-collapse border border-gray-600 text-white">
        <thead>
            <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">Minimum Specs</th>
                <th className="border border-gray-600 p-2">Recommended Specs</th>
            </tr>
        </thead>
        <tbody>
            {
                <tr className="bg-gray-900">
                    <td className=" text-start border border-gray-600 p-2">{data.recSpecs.split(":").reduce((acc, _, i, arr) => {
                    if (i % 2 === 0 && i + 1 < arr.length) {
                        acc.push(<li key={i}>{arr[i]}: {arr[i + 1]}</li>);
                    }
                    return acc;
                    }, [])}</td>
                    <td className="text-start border border-gray-600 p-2">
                        {data.recSpecs.split(":").reduce((acc, _, i, arr) => {
                    if (i % 2 === 0 && i + 1 < arr.length) {
                        acc.push(<li key={i}>{arr[i]}: {arr[i + 1]}</li>);
                    }
                    return acc;
                    }, [])}
                    </td>
                </tr>}
        </tbody>
    </table>
</div> <br />


                    {/* Purchase Links */}
                    <h3 className="text-lg font-semibold mb-2 text-start">Buy Now</h3>
                    <ul className="mb-4 text-start">
                        {data.purchaseLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-lg text-start font-semibold">Price: ${data.price}</h3>
                </div>
                <button 
                onClick={() => navigate(-1)} 
                className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-700"
            >
                ← Back
            </button>
            </div>
        </div>
    );
}

export default Gamepage;
