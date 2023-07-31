"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ReactPlayer from "react-player"

export default function Page() {
  const [videoURL, setVideoURL] = useState("")
  const [audioURL, setAudioURL] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const getTalk = async (talk_id) => {
    const options = {
      method: "GET",
      url: `https://api.d-id.com/talks/${talk_id}`,
      headers: {
        accept: "application/json",
        authorization:
          "Basic WVc1aGJuUm9MakkwYVhSQWJHbGpaWFF1WVdNdWFXNDpybHYtY1ZieHByUXYtcUE3RWRPMmo=",
      },
    }

    try {
      const response = await axios.request(options)
      if (response.data.result_url) {
        setVideoURL(response.data.result_url)
      } else {
        if (retryCount < 5) {
          // Retry after 1 second
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
    if (!audioURL) {
      const options = {
        method: "POST",
        url: "https://api.d-id.com/talks",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization:
            "Basic WVc1aGJuUm9MakkwYVhSQWJHbGpaWFF1WVdNdWFXNDpybHYtY1ZieHByUXYtcUE3RWRPMmo=",
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
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        authorization:
          "Basic WVc1aGJuUm9MakkwYVhSQWJHbGpaWFF1WVdNdWFXNDpybHYtY1ZieHByUXYtcUE3RWRPMmo=",
      },
      data: form,
    }

    try {
      const response = await axios.request(options)
      console.log("nicee")
      setAudioURL(response.data.url)
      createTalk(
        "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg",
        response.data.url
      )
    } catch (error) {
      console.log("nott")
      throw new Error("Failed to fetch data")
    }
  }

  useEffect(() => {
    console.log("ooooo")
    getAudioURL()

    // Clean up ongoing requests if the component unmounts
    return () => {
      clearTimeout(retryCount)
    }
  }, [retryCount])

  return (
    <>
      <main>
        <div>
          <h2>Audio player using binary data</h2>
          {videoURL.length > 0 && <ReactPlayer url={videoURL} playing loop />}
        </div>
      </main>
    </>
  )
}
