import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

const ChatPage = () => {
  const { id } = useParams();
  const characterId = id;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [character, setCharacter] = useState(null);
  const [input, setInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [conversationID, setConversationID] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${userId}/char/${characterId}`
        );
        const convo = res.data.convo.map((i) => i.messages);
        const character = res.data.convo.map((i) => i.character)[0];
        const filteredMessages = convo.flat().slice(1);
        setCharacter(character);
        setMessages(filteredMessages);
        const chatID = res.data.convo.map((i) => i._id);
        setConversationID(chatID);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    };

    fetchChat();
  }, [id, refresh]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/${userId}/char/${characterId}`,
        {
          userId,
          userMessage: input,
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setInput("");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleDelete = async (convoId) => {
    console.log(convoId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this chat?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/chat/${convoId}`);
        navigate("/allChat");
      } catch (error) {
        console.error("Failed to delete conversation:", error);
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-[78vh] bg-white py-6 px-4 sm:px-6 font-poppins">
      {/* Chat container */}
      <div className="flex flex-col h-full bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-400 bg-white z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 text-2xl hover:text-black hover:scale-115"
          >
            <IoArrowBack />
          </button>
          <img
            src={character?.avatarURL}
            alt={character?.name}
            className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {character?.name || "Character"}
          </h2>
          <div className="ml-auto me-5 text-red-400 hover:text-red-600 hover:scale-125">
            <button onClick={() => handleDelete(conversationID)}>
              <FaTrash />
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 bg-gray-900 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-lg px-6 py-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "ml-auto bg-gray-800 text-white rounded-br-none"
                  : "mr-auto bg-black text-white rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {/* to scroll down automatically when new message comes */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="p-4 border-t flex items-center gap-4 bg-white">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg text-sm outline-none bg-gray-100 shadow-sm transition"
          />
          <button
            onClick={handleSend}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-black transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;