import { NextRequest, NextResponse } from "next/server"

const axios = require("axios")

export async function GET(req: NextRequest) {
  const speechKey = process.env.SPEECH_KEY
  const speechRegion = process.env.SPEECH_REGION
  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    )
    return NextResponse.json(
      { token: tokenResponse.data, region: speechRegion },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: "There was an error authorizing your speech key." },
      { status: 401 }
    )
  }
}
