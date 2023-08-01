"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import _ from "lodash"
import {
  CancellationReason,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk"
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import { ColorRing } from "react-loader-spinner"
import ReactPlayer from "react-player"

import { getTokenOrRefresh } from "@/lib/token_util"
import { ChatBox } from "@/components/chatBox"
import { MicButton } from "@/components/mic"
import UserCam from "@/components/user-cam"

let tokenObj = null as any,
  speechConfig
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

  useEffect(() => {
    ;(async () => {
      tokenObj = await getTokenOrRefresh()
      speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
        tokenObj.authToken,
        tokenObj.region
      )
      speechConfig.speechRecognitionLanguage = "en-US"
    })()
  }, [])

  const pronunciationAssess = () => {
    let pushStream = speechsdk.AudioInputStream.createPushStream(
      speechsdk.AudioStreamFormat.getWaveFormatPCM(44100, 16, 1)
    )

    async function process(buffer, referenceText) {
      pushStream.write(buffer)
      pushStream.close()
      let audioConfig = speechsdk.AudioConfig.fromStreamInput(pushStream)

      speechConfig.speechRecognitionLanguage = "en-US"
      const pronunciationAssessmentConfig =
        new speechsdk.PronunciationAssessmentConfig(
          referenceText,
          speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
          speechsdk.PronunciationAssessmentGranularity.Phoneme,
          true
        )
      var reco = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)
      pronunciationAssessmentConfig.applyTo(reco)
      function onRecognizedResult(result) {
        console.log("pronunciation assessment for: ", result.text)
        var pronunciation_result =
          speechsdk.PronunciationAssessmentResult.fromResult(result)
        console.log(
          " Accuracy score: ",
          pronunciation_result.accuracyScore,
          "\n",
          "pronunciation score: ",
          pronunciation_result.pronunciationScore,
          "\n",
          "completeness score : ",
          pronunciation_result.completenessScore,
          "\n",
          "fluency score: ",
          pronunciation_result.fluencyScore
        )
        console.log("  Word-level details:")
        _.forEach(pronunciation_result.detailResult.Words, (word: any, idx) => {
          console.log(
            "    ",
            idx + 1,
            ": word: ",
            word.Word,
            "\taccuracy score: ",
            word.PronunciationAssessment.AccuracyScore,
            "\terror type: ",
            word.PronunciationAssessment.ErrorType,
            ";"
          )
        })
        reco.close()
      }

      reco.recognizeOnceAsync(function (successfulResult) {
        onRecognizedResult(successfulResult)
      })
    }

    let leftchannel = [] as any
    let rightchannel = [] as any
    let recorder = null as any
    let recordingLength = 0 as any
    let volume = null as any
    let mediaStream = null as any
    let sampleRate = 44100 as any
    let context = null as any
    let blob = null as Blob | null

    function flattenArray(channelBuffer, recordingLength) {
      let result = new Float32Array(recordingLength)
      let offset = 0
      for (let i = 0; i < channelBuffer.length; i++) {
        let buffer = channelBuffer[i]
        result.set(buffer, offset)
        offset += buffer.length
      }
      return result
    }

    function interleave(leftChannel, rightChannel) {
      let length = leftChannel.length + rightChannel.length
      let result = new Float32Array(length)

      let inputIndex = 0

      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex]
        result[index++] = rightChannel[inputIndex]
        inputIndex++
      }
      return result
    }

    function writeUTFBytes(view, offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    const startRecording = async () => {
      navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(
          function (e) {
            console.log("user consent")

            // creates the audio context
            window.AudioContext = window.AudioContext
            context = new AudioContext()

            // creates an audio node from the microphone incoming stream
            mediaStream = context.createMediaStreamSource(e)

            // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
            // bufferSize: the onaudioprocess event is called when the buffer is full
            let bufferSize = 2048
            let numberOfInputChannels = 2
            let numberOfOutputChannels = 2
            if (context.createScriptProcessor) {
              recorder = context.createScriptProcessor(
                bufferSize,
                numberOfInputChannels,
                numberOfOutputChannels
              )
            } else {
              recorder = context.createJavaScriptNode(
                bufferSize,
                numberOfInputChannels,
                numberOfOutputChannels
              )
            }

            recorder.onaudioprocess = function (e) {
              leftchannel.push(
                new Float32Array(e.inputBuffer.getChannelData(0))
              )
              rightchannel.push(
                new Float32Array(e.inputBuffer.getChannelData(1))
              )
              recordingLength += bufferSize
            }

            // we connect the recorder
            mediaStream.connect(recorder)
            recorder.connect(context.destination)
          },
          function (e) {
            console.error(e)
          }
        )
    }

    const stopRecording = (referenceText) => {
      recorder.disconnect(context.destination)
      mediaStream.disconnect(recorder)

      // we flat the left and right channels down
      // Float32Array[] => Float32Array
      let leftBuffer = flattenArray(leftchannel, recordingLength)
      let rightBuffer = flattenArray(rightchannel, recordingLength)
      // we interleave both channels together
      // [left[0],right[0],left[1],right[1],...]
      // let interleaved = interleave(leftBuffer, rightBuffer)

      // we create our wav file
      let buffer = new ArrayBuffer(44 + leftBuffer.length * 2)
      let view = new DataView(buffer)

      // RIFF chunk descriptor
      writeUTFBytes(view, 0, "RIFF")
      view.setUint32(4, 44 + leftBuffer.length * 2, true)
      writeUTFBytes(view, 8, "WAVE")
      // FMT sub-chunk
      writeUTFBytes(view, 12, "fmt ")
      view.setUint32(16, 16, true) // chunkSize
      view.setUint16(20, 1, true) // wFormatTag
      view.setUint16(22, 1, true) // wChannels: stereo (2 channels)
      view.setUint32(24, sampleRate, true) // dwSamplesPerSec
      view.setUint32(28, sampleRate * 2, true) // dwAvgBytesPerSec
      view.setUint16(32, 4, true) // wBlockAlign
      view.setUint16(34, 16, true) // wBitsPerSample
      // data sub-chunk
      writeUTFBytes(view, 36, "data")
      view.setUint32(40, leftBuffer.length * 2, true)

      // write the PCM samples
      let index = 44
      let volume = 1
      for (let i = 0; i < leftBuffer.length; i++) {
        view.setInt16(index, leftBuffer[i] * (0x7fff * volume), true)
        index += 2
      }

      // our final blob
      blob = new Blob([view], { type: "audio/wav" })

      blob.arrayBuffer().then((buf) => {
        process(buf, referenceText)
      })
    }
    startRecording()

    return stopRecording
  }

  const sttFromMic = async () => {
    if (!tokenObj) {
      setMicOn(false)
      return
    }
    const stop = pronunciationAssess()
    let out = ""
    console.log("sttFromMic")
    let stopper

    const audioConfig = speechsdk.AudioConfig.fromMicrophoneInput()
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

    recognizer.recognizing = (s, e) => {
      setCurrentUserChat(out + e.result.text)
      clearTimeout(stopper)
    }

    recognizer.recognized = (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        out += e.result.text + " "
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
      stop(out)
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
        authorization: `Basic ${process.env.DID_API_KEY}`,
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
        authorization: `Basic ${process.env.DID_API_KEY}`,
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
    const response = await fetch("https://job-jive.vercel.app/audios/audio.mp3")
    const audioBlob = await response.blob()
    form.append("audio", audioBlob, "nice.mp3")

    const options = {
      method: "POST",
      url: "https://api.d-id.com/audios",
      headers: {
        accept: "application/json",
        authorization: `Basic ${process.env.DID_API_KEY}`,
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
      url: "/api/tts",
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
      <div className="relative w-full md:w-3/4 h-full flex flex-col md:flex-row md:justify-center md:items-center gap-4">
        <UserCam />
        <div className="relative h-[60%] aspect-square rounded-full bg-gray-200 overflow-hidden flex justify-center items-center">
          {videoURL ? (
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url={videoURL}
              playing
              className="object-cover rounded-full"
            />
          ) : (
            <div className=" relative w-full h-full">
              <img
                src="https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg"
                alt="interview"
              />
              <div className="w-full h-full bg-[rgba(0,0,0,0.4)] absolute left-0 top-0"></div>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                colors={[
                  "white",
                  "rgba(0,0,0,0.5",
                  "rgba(0,0,0,0.5",
                  "rgba(0,0,0,0.5",
                  "rgba(0,0,0,0.5",
                ]}
              />
            </div>
          )}
        </div>
        <MicButton sttFromMic={sttFromMic} micOn={micOn} setMicOn={setMicOn} />
      </div>

      <div className="w-[40%] bg-gray-100 py-5 px-2 overflow-scroll">
        <ChatBox data={data} currentUserChat={currentUserChat} />
      </div>
    </div>
  )
}
