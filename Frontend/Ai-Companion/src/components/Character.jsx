import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Character() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  const getCharacter = async () => {
    const url = "http://localhost:3000/api/getCharacter";
    try {
      const result = await axios.get(url);
      const { characters } = result.data;
      setCharacters(characters.filter((i) => i.owner !== "user" && i.owner !== "role-play"));
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      toast.error("Error fetching characters");
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-white text-[#1a1a1a] px-6 py-6">
      {error && (
        <p className="text-center text-red-600 font-medium mb-6">{error}</p>
      )}

      <Slider {...settings}>
        {characters.map((character) => (
          <div key={character._id} className="p-4">
            <Link to={`/home/characterDetails/${character._id}`}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300">
                {character.avatarURL && (
                  <img
                    src={character.avatarURL}
                    alt={character.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-playfair font-semibold mb-2">
                  {character.name}
                </h2>
                <p className="text-sm text-[#3f3f3f] mb-2 line-clamp-4">
                  {character.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Character;