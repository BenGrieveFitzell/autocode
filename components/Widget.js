import { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { Octokit } from "octokit";
import generate from "../pages/api/generate";

function Widget() {
  const [code, setCode] = useState("");
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const currentPage = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/")
    );
    setLocation(currentPage);
    console.log(location);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const octokit = new Octokit({
      auth: "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",
    });

    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "BenGrieveFitzell", // Replace with the owner of the repository
          repo: "autocode", // Replace with the name of the repository
          path: `pages/${location}`, // Replace with the path to the file you want to retrieve
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

      return fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ change: change, code: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setChange("");
          setResult(data.finalResult);
          //   .then((result) => {
          //     fetch(
          //       `https://api.github.com/repos/BenGrieveFitzell/autocode/git/refs`,
          //       {
          //         method: "POST",
          //         headers: {
          //           Authorization: `token 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`,
          //           "Content-Type": "application/json",
          //         },
          //         body: JSON.stringify({
          //           ref: `refs/heads/newBranch`,
          //           sha: baseBranchSha, // replace with the SHA of the base commit
          //         }),
          //       }
          //     )
          //       .then((response) => response.json())
          //       .then((data) => {
          //         fetch(
          //           `https://api.github.com/repos/BenGrieveFitzell/autocode/contents/`,
          //           {
          //             method: "PUT",
          //             headers: {
          //               Authorization: `token ${accessToken}`,
          //               "Content-Type": "application/json",
          //             },
          //             body: JSON.stringify({
          //               message: "newcommitbranch",
          //               content: btoa(result), // encode the file contents as base64
          //               sha: "aa218f56b14c87dg891f9e74264a383fa43fejsb", // use the SHA of the new branch's base commit
          //             }),
          //           }
          //         )
          //           .then((response) => response.json())
          //           .then((data) => console.log(data)) // handle the response as needed
          //           .catch((error) => console.log(error)); // handle errors
          //       })
          //       .catch((error) => console.log(error)); // handle errors
          //   });
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <>
      <div>
        <p>result:</p>
        {result ? <p>{result}</p> : <p></p>}{" "}
      </div>
      <div className="mt-10">
        <p>initial</p>
        {code ? <p>{code}</p> : <p></p>}{" "}
      </div>
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
