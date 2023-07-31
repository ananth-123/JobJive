"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import _ from "lodash"
import {
  CancellationReason,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk"
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import ReactPlayer from "react-player"

import { getTokenOrRefresh } from "@/lib/token_util"
import { ChatBox } from "@/components/chatBox"
import { MicButton } from "@/components/mic"
import UserCam from "@/components/user-cam"
import { VideoButton } from "@/components/video"

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
  const [isVideoOn, setIsVideoOn] = useState(true)

  const handleVideoToggle = () => {
    setIsVideoOn((prev) => !prev)
  }

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

  const [videoURL, setVideoURL] = useState("")
  const [audioURL, setAudioURL] = useState("")
  const interviewerTextRef = useRef("")
  const [retryCount, setRetryCount] = useState(0)

  const getTalk = async (talk_id) => {
    const options = {
      method: "GET",
      url: `https://api.d-id.com/talks/${talk_id}`,
      headers: {
        accept: "application/json",
        authorization:
          "Basic Y25KbGJua3lNRUJuYldGcGJDNWpiMjA6MnF0cENXQ3dLUzJQdHJINVBhZEQz",
      },
    }

    try {
      const response = await axios.request(options)
      if (response.data.result_url) {
        setVideoURL(response.data.result_url)
        setRetryCount(0)
      } else {
        // Retry after 1 second
        if (retryCount < 5) {
          setTimeout(() => {
            setRetryCount(retryCount + 1)
            getTalk(talk_id)
          }, 1000)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createTalk = async (image_url, audio_url) => {
    const options = {
      method: "POST",
      url: "https://api.d-id.com/talks",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Basic Y25KbGJua3lNRUJuYldGcGJDNWpiMjA6MnF0cENXQ3dLUzJQdHJINVBhZEQz",
      },
      data: {
        script: {
          type: "audio",
          audio_url,
        },
        source_url: image_url,
      },
    }

    try {
      const response = await axios.request(options)
      getTalk(response.data.id)
    } catch (error) {
      console.error(error)
    }
  }

  const getAudioURL = async () => {
    const form = new FormData()
    const response = await fetch("http://localhost:3000/audios/audio.mp3")
    const audioBlob = await response.blob()
    form.append("audio", audioBlob, "nice.mp3")

    const options = {
      method: "POST",
      url: "https://api.d-id.com/audios",
      headers: {
        accept: "application/json",
        authorization:
          "Basic Y25KbGJua3lNRUJuYldGcGJDNWpiMjA6MnF0cENXQ3dLUzJQdHJINVBhZEQz",
      },
      data: form,
    }

    try {
      const response = await axios.request(options)
      setAudioURL(response.data.url)
      createTalk(
        "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg",
        response.data.url
      )
    } catch (error) {
      throw new Error("Failed to fetch data")
    }
  }

  const createAudio = async (text) => {
    let data = JSON.stringify({
      voice_id: "21m00Tcm4TlvDq8ikWAM",
      text_input: text,
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/tts",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)
      console.log(JSON.stringify(response.data))

      // Wait for a brief moment (you can adjust the duration) to allow the server to process the audio file.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      getAudioURL()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const lastMessage = data[data.length - 1]

    if (lastMessage && lastMessage.title === "Interviewer") {
      interviewerTextRef.current = lastMessage.text
      createAudio(lastMessage.text)
    } else if (lastMessage && lastMessage.title === "User") {
      // Skip calling createAudio if the last message is from the user
      interviewerTextRef.current = "" // Reset the interviewerTextRef if not an interviewer message
    }
  }, [data])

  return (
    <div className="flex flex-row px-24 py-10 w-full h-screen justify-between">
      <div className="relative w-full md:w-3/4 h-full flex flex-col md:flex-row md:justify-evenly md:items-center gap-4">
        <UserCam isVideoOn={isVideoOn} />
        <div className="relative w-96 h-96 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center">
          {videoURL && (
            <ReactPlayer
              url={videoURL}
              playing
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <div className="md:absolute flex md:bottom-5 md:left-1/2 md:transform md:-translate-x-1/2 gap-2">
          <MicButton
            sttFromMic={sttFromMic}
            micOn={micOn}
            setMicOn={setMicOn}
          />
          <VideoButton videoOn={isVideoOn} setVideoOn={setIsVideoOn} />
        </div>
      </div>

      <div className="w-[40%] bg-gray-100 py-5 px-2 overflow-scroll">
        <ChatBox data={data} currentUserChat={currentUserChat} />
      </div>
    </div>
  )
}
