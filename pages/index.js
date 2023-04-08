import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [changeInput, setChangeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ change: changeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setChangeInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Auto code</title>
        <link rel="icon" href="" />
      </Head>

      <main>
        <h3>Submit a change</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="change"
            placeholder="Enter an change"
            value={changeInput}
            onChange={(e) => setChangeInput(e.target.value)}
          />
          <input type="submit" value="Submit Change" />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}
