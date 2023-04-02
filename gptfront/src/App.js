import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("/");
  const handleSubmite = (e) => {
    e.preventDefault();
    //console.log(model);
    fetch("http://localhost:3001" + model, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setResponse(res.message);
      });
  };
  return (
    <>
      <div className="App">
        <form className="Form" onSubmit={handleSubmite}>
          <h2>OpenAi Testing</h2>
          <label>Model: </label>
          <select
            className="dsadsa"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          >
            <option value="/" defaultChecked>
              text-davinci-003
            </option>
            <option value="/gpt3">gpt-3.5-turbo</option>
          </select>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <button type="submit">Submit</button>
        </form>
        {response.split("\n\n").map((t, key) => {
          return <h2 key={key}>{t}</h2>;
        })}
      </div>
    </>
  );
}

export default App;
