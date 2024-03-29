import Head from "next/head";
import { useState } from "react";
import { Octokit } from "octokit";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/router";

const octokit = new Octokit({
  auth: "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",
});

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [pageLocation, setPageLocation] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const currentPage = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    console.log(currentPage); // outputs "TestPage"

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
    <div>
      <Head>
        <title>testing</title>
        <link rel="icon" href="" />
      </Head>

      <main className="bg-white h-full flex flex-col justify-between">
        {/* <Header /> */}

        <div className="flex-1 p-4 overflow-y-auto">
          <>
            <div>
              <div>
                <button onClick={() => router.push("/TestPage")}>
                  Go to test page
                </button>
              </div>
              <h2 className="mt-[60px]">
                New updated code being generated based on user feedback that
                will then be sent back to github in new branch:
              </h2>
              {result && (
                <div className="my-4 py-2 px-4 bg-gray-100 rounded-lg text-gray-800">
                  {result}
                </div>
              )}{" "}
            </div>
          </>
          <div>
            <h2 className="mt-[60px]">
              Initial code being fetched from GitHub below:
            </h2>
            {code && (
              <div className="my-4 py-2 px-4 bg-gray-100 rounded-lg text-gray-800">
                {code}
              </div>
            )}
          </div>
        </div>

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
      </main>
    </div>
  );
}
