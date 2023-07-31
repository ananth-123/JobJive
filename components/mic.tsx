"use client"

import { useState } from "react"
import { Mic, MicOff } from "lucide-react"

export function MicButton({ sttFromMic, micOn, setMicOn }) {
  return (
    <div
      onClick={() => {
        if (!micOn) {
          setMicOn(true)
          sttFromMic()
        }
      }}
      className={
        "p-4 rounded-full h-fit shadow-lg cursor-pointer md:ml-2 md:mb-2 md:mt-0 md:transform md:left-0 md:bottom-0 md:translate-x-0 md:-translate-y-0 md:static " +
        (micOn ? "bg-green-600" : "bg-red-600")
      }
    >
      <Mic className={micOn ? "block" : "hidden"} />
      <MicOff className={micOn ? "hidden" : "block"} />
    </div>
  )
}
