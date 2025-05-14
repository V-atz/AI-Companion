import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

function CharacterDetails() {
  const { id: characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getCharacterDetails = async () => {
    const url = `http://localhost:3000/api/getCharacter/${characterId}`;
    try {
      const result = await axios.get(url);
      setCharacter(result.data.character);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    getCharacterDetails();
  }, [characterId]);

  const handleStartChat = () => {
    navigate(`/chat/${characterId}`);
  };

  if (error) {
    return <p className="text-center text-red-600 mt-6">{error}</p>;
  }

  if (!character) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  const handleDelete = async (charId) => {
    console.log(charId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this character?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/deleteCharacter/${charId}`
        );
        navigate("/customCharacter");
      } catch (error) {
        console.error("Failed to delete conversation:", error);
      }
    }
  };

  return (
    <div className="bg-white text-[#1a1a1a] px-4 sm:px-6 py-6 h-auto">
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center border px-2 py-1 rounded-lg bg-gray-600 text-white hover:bg-black mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>
        {character.owner === "user" && (
          <button
            className="ml-auto text-red-400 hover:scale-115 hover:text-red-600"
            onClick={() => handleDelete(character?._id)}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-full mx-auto">
        <div className="flex justify-start gap-10">
          <div className="w-[40%]">
            <img
              src={character.avatarURL}
              alt={character.name}
              className="w-100 h-120 object-cover rounded-xl mb-6"
            />
          </div>
          <div className="max-w-[55%]">
            <h3 className="text-3xl font-bold mb-2">{character.name}</h3>
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              {character.description}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Personality Traits:</p>
          <ul className="list-none flex gap-5 gap-y-2 gap-x-2 flex-wrap space-y-1 text-gray-600">
            {character.personalityTrait.map((trait, index) => (
              <li
                className="border border-gray-400 px-3 py-1 rounded-lg bg-gray-100"
                key={index}
              >
                {trait}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartChat}
            className="bg-gray-600 border border-black hover:bg-black text-white hover:shadow-md font-medium px-[10%] py-3 rounded-xl transition"
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;