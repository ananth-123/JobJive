import React, { useEffect, useRef } from "react"

const UserCam = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Function to get user media stream
    const getUserMediaStream = async () => {
      try {
        // Get the user media stream from the webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })

        // Set the stream as the video source
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing webcam:", error)
      }
    }

    // Call the function to get user media stream
    getUserMediaStream()

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (
        videoRef.current &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <video
        className="rounded-full w-1/2 h-full"
        ref={videoRef}
        autoPlay
        playsInline
      />
    </div>
  )
}

export default UserCam
