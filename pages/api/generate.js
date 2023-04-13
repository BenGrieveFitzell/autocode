import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const change = req.body.change || "";
  const code = req.body.code || "";

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(change, code),
      max_tokens: 2024,
      temperature: 0.9,
    });
    res.status(200).json({ finalResult: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
      ``;
    }
  }
}

function generatePrompt(change, code) {
  // const formattedCode = JSON.stringify(code);
  return `Make the change to the code. Here is the change: ${change}; and here is the code: ${code}.
    `;
}
