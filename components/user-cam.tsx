import React, { useEffect, useRef } from "react"

const UserCam = ({ isVideoOn }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const getUserMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        if (videoRef.current && isVideoOn) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing webcam:", error)
      }
    }

    getUserMediaStream()

    return () => {
      if (
        videoRef.current &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isVideoOn])

  const AvatarPlaceholder = () => {
    const avatarUrl =
      "https://illustrations.popsy.co/amber/man-with-short-hair-avatar.svg"

    return (
      <img
        src={avatarUrl}
        alt="Avatar Placeholder"
        className="rounded-full bg-white flex items-center justify-center"
      />
    )
  }

  return (
    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
      {isVideoOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <AvatarPlaceholder />
      )}
    </div>
  )
}

export default UserCam
