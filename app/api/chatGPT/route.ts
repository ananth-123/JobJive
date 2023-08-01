import { NextRequest, NextResponse } from "next/server"
import { openai } from "lib/openai"

let context

export async function POST(req: NextRequest) {
  let { answer, jobRole } = await req.json()

  if (!context && jobRole) {
    context = [
      {
        role: "system",
        content: `You are an experienced HR trying to hire a new employee. You are interviewing the candidate for a ${jobRole} job. Ask exactly 3 questions one after one with the previous answer of the user in context. Frame suitable follow up questions in case of digressing answers. After the canidadate's final answer, state the candidate's strengths and weaknesses with the improvements required in a concise manner spanning about 3 points each.`,
      },
      { role: "assistant", content: "Tell me about yourself." },
    ]
  }

  answer =
    answer ||
    "I am a software engineer with 5 years of experience in the field. I have worked on multiple projects and have experience in both frontend and backend development."
  context.push({ role: "user", content: answer })

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: context,
    temperature: 0.6,
    max_tokens: 200,
    top_p: 0.3,
    frequency_penalty: 1,
    presence_penalty: 0.4,
  })
  context.push(completion.data.choices[0].message)
  return NextResponse.json(completion.data.choices[0].message)
}
