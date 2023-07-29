import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { voiceId } = await req.json()

    const data = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        text: "h",
        model_id: "eleven_monolingual_v1", // or you can change to monolingual v4
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
          "Content-Type": "audio/mpeg",
        },
      }
    )
    if (data) {
      console.log(data)

      return NextResponse.json(data)
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
