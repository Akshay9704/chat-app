import { useState, useEffect, useRef } from "react";
import { addMsg, receiveMsg } from "./features/chat/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [input, setInput] = useState(""); // Input state
  const [delay, setDelay] = useState(false); // State to manage button disabling
  const dispatch = useDispatch(); // Redux dispatch
  const chatEndRef = useRef(null); // Ref to scroll to the latest message

  const chats = useSelector((state) => state.chat.chat); // Select chat messages from Redux store

  const addHandler = () => {
    if (input.trim() === "") {
      toast.error("Message cannot be empty!");
      return;
    }

    dispatch(addMsg({ text: input }));
    setInput("");
    setDelay(true);

    setTimeout(() => {
      const mockResponse = {
        text: "Response from the server",
      };
      dispatch(receiveMsg(mockResponse));
      setDelay(false);
    }, 1500);
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Helper function to format timestamp
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "Invalid Timestamp"
      : `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="App flex justify-center h-screen">
      <div className="border w-full p-3 m-5 mt-10 h-4/5 flex flex-col bg-gray-100 rounded-lg shadow-lg">
        {/* Chat messages area */}
        <div className="flex-grow overflow-y-auto p-3 flex flex-col">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`mb-2 p-2 rounded-lg max-w-xs ${
                index % 2 === 0
                  ? "bg-blue-500 text-white self-start"
                  : "bg-gray-300 text-black self-end"
              }`}
            >
              <div>{chat.text}</div>
              <div className="text-xs text-gray-900 mt-1">
                {formatDateTime(chat.timestamp || new Date().toISOString())}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* This ensures auto-scroll */}
        </div>

        <div className="w-full flex items-center gap-2 p-2 bg-white rounded-b-lg">
          <input
            type="text"
            value={input}
            className="border p-3 w-full rounded-lg focus:outline-none"
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="border text-xl rounded-lg p-4 bg-blue-500 text-white"
            onClick={addHandler}
            disabled={delay}
          >
            {delay ? <CloseIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
