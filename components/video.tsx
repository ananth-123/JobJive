import { Video, VideoOff } from "lucide-react"

export function VideoButton({ videoOn, setVideoOn }) {
  return (
    <div
      onClick={() => {
        setVideoOn((prev) => !prev)
      }}
      className={
        "p-4 rounded-full h-fit shadow-lg cursor-pointer md:mr-2 md:mb-2 md:mt-0 md:transform md:left-0 md:bottom-0 md:translate-x-0 md:-translate-y-0 md:static " +
        (videoOn ? "bg-green-600" : "bg-red-600")
      }
    >
      <Video className={videoOn ? "block" : "hidden"} />
      <VideoOff className={videoOn ? "hidden" : "block"} />
    </div>
  )
}
