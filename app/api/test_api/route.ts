// app/api/test_api/route.ts
import { NextRequest } from "next/server"
import { Configuration, OpenAIApi } from "openai"

import formatMessages from "../../../helpers/formatMessages"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  const PROMPT = `Respond "Pong"`

  const formatted = formatMessages(["ping:"], [], PROMPT)
  let configuration = new Configuration({
    apiKey: key as string,
  })
  const openai = new OpenAIApi(configuration)

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: formatted,
    })

    if (completion.data.choices && completion.data.choices[0]) {
      return new Response(JSON.stringify({ status: true }), { status: 200 })
    } else {
      return new Response(
        JSON.stringify({ status: true, message: "No response from AI." }),
        { status: 200 }
      )
    }
  } catch (error) {
    return new Response(JSON.stringify({ status: false }), { status: 400 })
  }
}
