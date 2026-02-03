import { useState } from "react";

export default function Chat() {
 const [message, setMessage] = useState("");
 const [reply, setReply] = useState("");
 const [loading, setLoading] = useState(false);

 const sendMessage = async () => {
   if (!message.trim()) return;

   setLoading(true);
   setReply("");

   try {
     const res = await fetch("http://localhost:8000/chat", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message })
     });

     const data = await res.json();
     setReply(data.response);
   } catch (err) {
     setReply("Error connecting to AI");
   }

   setLoading(false);
   setMessage("");
 };

 return (
   <div className="chat-box">
     <h2>Offline AI Chatbot</h2>

     <textarea
       placeholder="Type your message..."
       value={message}
       onChange={(e) => setMessage(e.target.value)}
     />

     <button onClick={sendMessage} disabled={loading}>
       {loading ? "Thinking..." : "Send"}
     </button>

     {reply && <div className="reply">{reply}</div>}
   </div>
 );
}
