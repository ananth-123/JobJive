"use client"

import { useEffect, useState } from "react"
import difflib from "difflib"
import _ from "lodash"
import {
  CancellationReason,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk"
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import Segment from "segment"

import { getTokenOrRefresh } from "@/lib/token_util"

const getUserMedia = require("get-user-media-promise")
const MicrophoneStream = require("microphone-stream").default

let sttStream,
  paStream,
  mic,
  prevAudioData = [] as Blob[]

let written = false
const MicTest = () => {
  const [displayText, setDisplayText] = useState("")

  // useEffect(() => {
  //   ;(async () => {
  //     const microphoneStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     })

  //     mic = new MediaRecorder(microphoneStream)

  //     sttStream = speechsdk.AudioInputStream.createPushStream()

  //     mic.ondataavailable = (event) => {
  //       const audioData = event.data
  //       paStream.write(audioData)
  //       console.log(paStream)
  //       written = true
  //     }
  //   })()
  // }, [])

  const sttFromMic = async () => {
    const micStream = new MicrophoneStream()
    getUserMedia({ video: false, audio: true })
      .then(function (stream) {
        micStream.setStream(stream)
      })
      .catch(function (error) {
        console.log(error)
      })

    micStream.on("format", function (format) {
      paStream = speechsdk.AudioInputStream.createPushStream(
        speechsdk.AudioStreamFormat.getWaveFormatPCM(
          format.sampleRate,
          format.bitDepth,
          format.channels
        )
      )
    })
    micStream.on("data", function (chunk) {
      paStream.write(chunk)
    })

    let out = ""
    let stopper
    const tokenObj = await getTokenOrRefresh()
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    )
    speechConfig.speechRecognitionLanguage = "en-US"

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput()
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

    setDisplayText("speak into your microphone...")

    const pronunciationAssessmentConfig =
      //prettier-ignore
      speechsdk.PronunciationAssessmentConfig.fromJSON("{\"referenceText\":\"good morning\",\"gradingSystem\":\"HundredMark\",\"granularity\":\"Phoneme\",\"EnableMiscue\":true}")

    const startPronunciationAssessment = (text: string) => {
      const audioConfig2 = speechsdk.AudioConfig.fromStreamInput(paStream)
      const recognizer2 = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig2
      )
      pronunciationAssessmentConfig.applyTo(recognizer2)

      recognizer2.recognizeOnceAsync(
        (result: speechsdk.SpeechRecognitionResult) => {
          console.log("Result", result)
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
        },
        (e) => {
          if (e) {
            console.log(e)
          }
          console.error("ERROR: ")
        }
      )
    }

    recognizer.recognizing = (s, e) => {
      setDisplayText(`RECOGNIZING: Text=${e.result.text}`)
      console.log("Recognizing")
      clearTimeout(stopper)
    }

    recognizer.recognized = (s, e) => {
      // mic.requestData()
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        out += e.result.text + " "

        startPronunciationAssessment(e.result.text)

        setDisplayText(`RECOGNIZED: Text=${e.result.text}`)
      } else if (e.result.reason == ResultReason.NoMatch) {
        setDisplayText("NOMATCH: Speech could not be recognized.")
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
      console.log("\n    Session stopped event.")
      console.log("Final Result: ", out)
      recognizer.stopContinuousRecognitionAsync()

      recognizer.close()
    }

    recognizer.startContinuousRecognitionAsync()
  }

  return (
    <div className="app-container">
      <h1 className="display-4 mb-3">Speech sample app</h1>

      <div className="row main-container">
        <div className="col-6">
          <i
            className="fas fa-microphone fa-lg mr-2"
            onClick={() => sttFromMic()}
          >
            Mic Button
          </i>
          Convert speech to text from your mic.
        </div>
        <div className="col-6 output-display rounded">
          <code>{displayText}</code>
        </div>
      </div>
    </div>
  )
}

export default MicTest
