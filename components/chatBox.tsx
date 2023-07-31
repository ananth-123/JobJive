"use client"

import "react-chat-elements/dist/main.css"
import { useEffect, useRef, useState } from "react"
import { MessageList, MessageType } from "react-chat-elements"

export function ChatBox({ currentUserChat, data }) {
  const [fullData, setFullData] = useState([{}] as MessageType[])

  useEffect(() => {
    if (currentUserChat.length > 0) {
      const userMessage = {
        position: "right",
        type: "text",
        title: "User",
        text: currentUserChat,
      } as MessageType

      setFullData([...data, userMessage])
    }
  }, [currentUserChat])

  useEffect(() => {
    setFullData(data)
  }, [data])

  const chat = useRef(null)

  return (
    <div className="w-full h-ful">
      <MessageList
        referance={chat}
        lockable={false}
        toBottomHeight={"100%"}
        dataSource={fullData}
      ></MessageList>
    </div>
  )
}
