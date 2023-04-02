import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmite = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((res) => setResponse(res.message));
  };
  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmite}>
          <select>
            <option value="/" defaultChecked>
              text-davinci-003
            </option>
            <option value="/gpt3">gpt-3.5-turbo</option>
          </select>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <button type="submit">Submit</button>
        </form>
        <h2>{response}</h2>
      </div>
    </>
  );
}

export default App;
