import { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";

function Widget() {
  const [code, setCode] = useState("");
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const currentPage = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/")
    );
    console.log(currentPage);
  });

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "BenGrieveFitzell", // Replace with the owner of the repository
          repo: "autocode", // Replace with the name of the repository
          path: "pages/index.js", // Replace with the path to the file you want to retrieve
        }
      );
      const code = Buffer.from(response.data.content, "base64").toString();
      setCode(code);

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      return fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ change: change, code: code }),
      })
        .then((response) => response.json())
        .then((data) => setResult(data.finalResult))
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });

      setLoading(false);
      setChange("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <>
      {code ? <p>{code}</p> : <p></p>}
      <div>
        <form
          onSubmit={onSubmit}
          className="flex items-center bg-gray-100 px-4 py-2 fixed bottom-0 w-full md:w-[500px] md:bottom-8 md:left-[20%] lg:w-[700px] lg:left-[28%]"
        >
          <input
            type="text"
            name="prompt"
            placeholder="Enter a feature suggestion or bug..."
            value={change}
            onChange={(e) => setChange(e.target.value)}
            className="flex-1 text-gray-800 bg-gray-200 rounded-lg py-2 px-4 mr-2 focus:outline-none"
          />
          <button type="submit" className="text-xl text-gray-800">
            {loading ? <p>...</p> : <BsSend />}
          </button>
        </form>
      </div>
    </>
  );
}

export default Widget;
