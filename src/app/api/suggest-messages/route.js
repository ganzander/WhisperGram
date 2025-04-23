import Groq from "groq-sdk";

const groqApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: groqApiKey });

export async function GET() {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: ` Create a list of three unique, open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure every time questions are unique and random`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const rawContent = response.choices[0]?.message?.content;

  const quesArr = rawContent.split("||");

  return Response.json({ Success: true, data: quesArr }, { status: 200 });
}
