"use client"
import * as React from "react"
import { OpenAIAPIKeyInput } from "./openaiAPIKeyInput"
import { ChatWindow } from "./ChatWindow"
import { MessageInput } from "./MessageInput"
import { useCallback, useState, useRef, useEffect } from "react"
import { fetchEventSource } from "@microsoft/fetch-event-source"

export function ChatBox() {
  const [oaiKey, setOaiKey] = useState("")
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Good morning! What can I do for you today?" },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() !== "" && !isLoading) {
      setIsLoading(true)
      setInputText("")

      const userMessage = { sender: "user", text: inputText.trim() }
      const assistantMessage = { sender: "assistant", text: "" }

      setMessages([...messages, userMessage, assistantMessage])

      // Extract assistant and user messages
      const userMessages = messages
        .filter((msg) => msg.sender === "user")
        .map((msg) => msg.text)
      userMessages.push(inputText.trim()) // include the new user message
      const assistantMessages = messages
        .filter((msg) => msg.sender === "assistant")
        .map((msg) => msg.text)

      try {
        let currentStreamedText = ""

        await fetchEventSource("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            key: oaiKey,
            chatModel: "gpt-3.5-turbo",
            PROMPT: "You are an ai assistant.",
            a: JSON.stringify(assistantMessages),
            u: JSON.stringify(userMessages),
          }),
          headers: { "Content-Type": "application/json" },
          onmessage(ev) {
            if (ev.data) {
              currentStreamedText += ev.data
            } else {
              currentStreamedText += "\n"
            }

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages]
              const lastMessageIndex = newMessages.length - 1

              newMessages[lastMessageIndex] = {
                ...newMessages[lastMessageIndex],
                text: currentStreamedText,
              }

              return newMessages
            })
          },
          onerror(err) {
            console.error("EventSource failed:", err)
            setIsLoading(false)
          },
          onclose() {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages]
              const lastMessageIndex = newMessages.length - 1

              newMessages[lastMessageIndex] = {
                ...newMessages[lastMessageIndex],
              }
              setIsLoading(false)
              return newMessages
            })
          },
        })
      } catch (error) {
        console.error("Error:", error)
        setIsLoading(false)
      }
    }
  }, [inputText, isLoading, messages, oaiKey])

  //@ts-ignore
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage()
      event.preventDefault()
    }
  }

  const isDisabled = !oaiKey
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoading && scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <section>
      <OpenAIAPIKeyInput oaiKey={oaiKey} setOaiKey={setOaiKey} />
      <ChatWindow messages={messages} scrollAreaRef={scrollAreaRef} />
      <MessageInput
        isDisabled={isDisabled}
        isLoading={isLoading}
        inputText={inputText}
        handleKeyDown={handleKeyDown}
        handleSendMessage={handleSendMessage}
        setInputText={setInputText}
      />
    </section>
  )
}
