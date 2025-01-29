import React, { useState } from "react";
import axios from "axios";

const SendRequest: React.FC = () => {
  const [senderId, setSenderId] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:8080/api/connections/send", null, {
        params: { senderId, receiverId },
      });
      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sender ID"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <button onClick={sendRequest}>Send Request</button>
    </div>
  );
};

export default SendRequest;
