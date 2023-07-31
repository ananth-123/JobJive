import { NextRequest, NextResponse } from "next/server"

const voice = require("elevenlabs-node")

export async function POST(req: NextRequest) {
  try {
    const { voice_id, text_input } = await req.json()
    const fileName = "public/audios/audio.mp3" // The name of your audio file

    const resp = await voice.textToSpeech(
      process.env.ELEVENLABS_API_KEY,
      voice_id,
      fileName,
      text_input
    )

    console.log(resp)
    return new NextResponse(JSON.stringify({ nice: resp.status }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
