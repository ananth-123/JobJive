import { NextRequest, NextResponse } from "next/server"

const voice = require("elevenlabs-node")

export async function POST(req: NextRequest, res: NextResponse) {
  const { voice_id } = await req.json()

  const fileName = "public/audios/audio.mp3" // The name of your audio file
  const textInput =
    "hello ananth, daniel and alwin. how are you guys? nice to meet youuu" // The text you wish to convert to speech

  voice
    .textToSpeech(process.env.ELEVENLABS_API_KEY, voice_id, fileName, textInput)
    .then((resp) => {
      console.log(resp)
      return NextResponse.json({ nice: resp.status }, { status: 200 })
    })
    .catch((e) => {
      return NextResponse.json({ error: e.message }, { status: 500 })
    })
}
