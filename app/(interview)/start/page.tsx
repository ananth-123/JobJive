"use client"

import { useState } from "react"
import axios from "axios"
import _ from "lodash"
import {
  CancellationReason,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk"
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"

import { getTokenOrRefresh } from "@/lib/token_util"
import { ChatBox } from "@/components/chatBox"
import { Mic } from "@/components/mic"

export default function StartInterview() {
  const [currentUserChat, setCurrentUserChat] = useState("")
  const [micOn, setMicOn] = useState(false)
  const [data, setData] = useState([
    {
      type: "system",
      text: "Interview started",
    },
    {
      position: "left",
      type: "text",
      title: "Interviewer",
      text: "Hi. Can we start by telling me a little about yourself?",
    },
  ])

  const sttFromMic = async () => {
    let out = ""
    console.log("sttFromMic")
    let stopper
    const tokenObj = await getTokenOrRefresh()
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    )
    speechConfig.speechRecognitionLanguage = "en-US"

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput()
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

    recognizer.recognizing = (s, e) => {
      setCurrentUserChat(out + e.result.text)
      clearTimeout(stopper)
    }

    recognizer.recognized = (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        out += e.result.text + " "
        // setCurrentFullUserMsg((m) => {
        //   console.log(m + e.result.text)
        //   return m + e.result.text + " "
        // })
      } else if (e.result.reason == ResultReason.NoMatch) {
        // setDisplayText("NOMATCH: Speech could not be recognized.")
        recognizer.stopContinuousRecognitionAsync()
      }
      stopper = setTimeout(() => {
        recognizer.stopContinuousRecognitionAsync()
      }, 2500)
    }

    recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`)

      if (e.reason == CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`)
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`)
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        )
      }

      recognizer.stopContinuousRecognitionAsync()
    }

    recognizer.sessionStopped = (s, e) => {
      setData((data) => [
        ...data,
        {
          position: "right",
          type: "text",
          title: "User",
          text: out,
        },
      ])
      console.log("sessionStopped", out)
      axios
        .post("/api/chatGPT", { answer: out, jobRole: "Software Engineer" })
        .then((res) => {
          console.log(res.data.content)
          setData((data) => [
            ...data,
            {
              position: "left",
              type: "text",
              title: "Interviewer",
              text: res.data.content,
            },
          ])
        })

      recognizer.stopContinuousRecognitionAsync()
      setMicOn(false)

      recognizer.close()
    }

    recognizer.startContinuousRecognitionAsync()
  }

  return (
    <div className="flex flex-row px-24 py-10 w-full h-screen justify-between">
      <div className="relative w-full h-full bg-black">
        <Mic sttFromMic={sttFromMic} micOn={micOn} setMicOn={setMicOn} />
      </div>

      <div className="w-[40%] bg-gray-100 py-5 px-2 overflow-scroll">
        <ChatBox data={data} currentUserChat={currentUserChat} />
      </div>
    </div>
  )
}
