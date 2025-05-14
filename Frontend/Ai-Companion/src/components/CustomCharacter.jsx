import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadService from "../api/uploadService";
import { Link } from "react-router-dom";

function CustomCharacter() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    avatarURL: "",
    owner: "user",
    personalityTrait: [],
    style: {
      tone: "",
      temperature: "",
      length: "",
    },
  });
  const [file, setFile] = useState(null);

  // Fetch user-created components from Database
  const getCharacters = async () => {
    const url = "http://localhost:3000/api/getCharacter";
    try {
      const result = await axios.get(url);
      const finalResult = result.data.characters.filter(
        (i) => i.owner !== "pre-built" && i.owner !== "role-play"
      );
      setCharacters(finalResult);
    } catch (error) {
      setError(
        "Something went wrong. Please try again or Add a new Character."
      );
      toast.error("Error fetching characters");
    }
  };

  // File handling
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Character Validation
  const validateCharacter = () => {
    if (!newCharacter.name) {
      toast.error("Please enter a name for the character.");
      return false;
    }
    if (!newCharacter.description) {
      toast.error("Please enter a description for the character.");
      return false;
    }
    if (!newCharacter.style.tone) {
      toast.error("Please select a tone for the character.");
      return false;
    }
    if (!newCharacter.style.temperature) {
      toast.error("Please select a temperature for the character.");
      return false;
    }
    if (!newCharacter.style.length) {
      toast.error("Please select a length for the character.");
      return false;
    }
    if (!file) {
      toast.error("Please upload an avatar.");
      return false;
    }
    return true;
  };

  // Add new character API call
  const handleAddCharacter = async () => {
    if (!validateCharacter()) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Show toast for uploading process
      toast.info("Uploading avatar... Please wait.", { autoClose: false });

      // Cloudinary file upload & fetch image URL
      const uploadResponse = await uploadService(file, "avatar");
      const avatarURL = uploadResponse.fileURL;

      const url = "http://localhost:3000/api/addCharacter";
      const characterData = { ...newCharacter, avatarURL };

      // Notify the user about the success
      await axios.post(url, characterData);
      toast.success("Character added successfully!");

      setIsModalOpen(false);
      setNewCharacter({
        name: "",
        description: "",
        avatarURL: "",
        owner: "user",
        personalityTrait: [],
        style: {
          tone: "",
          temperature: "",
          length: "",
        },
      });
      setFile(null);
      getCharacters();
    } catch (error) {
      toast.error("Error adding character. Please try again.");
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="bg-white text-[#1a1a1a] px-6 py-6">
      <div className="text-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow-md hover:bg-black transition"
        >
          Add New Character
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-6 relative">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              Add New Character
            </h2>

            <div className="flex gap-5">
              {/* Character Name */}
              <div className="max-w-[22vw] py-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={newCharacter.name}
                  onChange={(e) =>
                    setNewCharacter({ ...newCharacter, name: e.target.value })
                  }
                  className="w-full mb-4 px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                {/* Character Description */}
                <textarea
                  placeholder="Description"
                  value={newCharacter.description}
                  maxLength={1000}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      description: e.target.value,
                    })
                  }
                  className="w-full mb-4 px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                {/* Personality Traits */}
                <input
                  type="text"
                  placeholder="Personality Traits (comma separated)"
                  value={newCharacter.personalityTrait.join(", ")}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      personalityTrait: e.target.value
                        .split(",")
                        .map((t) => t.trim()),
                    })
                  }
                  className="w-full mb-4 px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <input
                  type="text"
                  placeholder="Tone (e.g., intense, prideful)"
                  value={newCharacter.style.tone}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      style: { ...newCharacter.style, tone: e.target.value },
                    })
                  }
                  className="w-full mb-4 px-4 py-2 text-base border border-gray-300 rounded-lg"
                />
              </div>

              {/* Temperature */}
              <div className="py-2 w-[25vw]">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Style Tone (Temperature)
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        newCharacter.style.temperature === 0.9
                          ? "bg-blue-600 text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setNewCharacter({
                          ...newCharacter,
                          style: { ...newCharacter.style, temperature: 0.9 },
                        })
                      }
                    >
                      Creative
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        newCharacter.style.temperature === 0.7
                          ? "bg-blue-600 text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setNewCharacter({
                          ...newCharacter,
                          style: { ...newCharacter.style, temperature: 0.7 },
                        })
                      }
                    >
                      Balanced
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        newCharacter.style.temperature === 0.5
                          ? "bg-blue-600 text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setNewCharacter({
                          ...newCharacter,
                          style: { ...newCharacter.style, temperature: 0.5 },
                        })
                      }
                    >
                      Precise
                    </button>
                  </div>
                </div>

                {/* Length */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Expected Length
                  </p>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((len) => (
                      <button
                        key={len}
                        type="button"
                        className={`px-3 py-2 rounded-lg text-sm border ${
                          newCharacter.style.length === len
                            ? "bg-blue-600 text-white"
                            : "border-gray-300"
                        }`}
                        onClick={() =>
                          setNewCharacter({
                            ...newCharacter,
                            style: {
                              ...newCharacter.style,
                              length: parseInt(len),
                            },
                          })
                        }
                      >
                        {len} Line{len > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Avatar
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-3"
                  />
                </div>
                {file && (
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Avatar Preview"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCharacter}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Displaying existing characters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <div key={character._id} className="p-4">
            <Link to={`/home/characterDetails/${character._id}`}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300">
                {character.avatarURL && (
                  <img
                    src={character.avatarURL}
                    alt={character.name}
                    className="w-full h-60 object-cover rounded-md mb-4"
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
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default CustomCharacter;