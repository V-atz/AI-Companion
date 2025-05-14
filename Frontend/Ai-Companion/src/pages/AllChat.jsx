import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { truncateMessage } from "../utility/truncateMessage";

const AllChat = () => {
  const [chats, setChats] = useState([]);
  const [characterDetails, setCharacterDetails] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${userId}/chats`
        );

        const charDetails = res.data.chats.map((c) => c.character);
        setCharacterDetails(charDetails);

        const latestMessages = res.data.chats.map((chat) => {
          const messages = chat.messages;
          return messages[messages.length - 1];
        });

        setChats(latestMessages);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="min-h-[80vh] bg-white py-10 px-4 sm:px-10 font-poppins">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Chats</h1>
      <div className="grid gap-5">
        {chats.length === 0 ? (
          <p className="text-gray-500">No chats yet.</p>
        ) : (
          chats.map((chat, index) => {
            const character = characterDetails[index];
            return (
              <Link
                to={`/chat/${character?._id}`}
                key={chat._id}
                className="flex items-center gap-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100 hover:border-gray-300"
              >
                {/* Avatar */}
                <img
                  src={character?.avatarURL}
                  alt={character?.name}
                  className="h-16 w-16 rounded-full border border-gray-300 object-cover"
                />

                {/* Info */}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">
                    {character?.name || "Character"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {truncateMessage(chat.content, 15)}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllChat;