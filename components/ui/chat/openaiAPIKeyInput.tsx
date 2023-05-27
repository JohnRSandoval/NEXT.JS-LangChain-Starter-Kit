"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"

import { Input } from "@/components/ui/input"

//@ts-ignore
export function OpenAIAPIKeyInput({ oaiKey, setOaiKey }) {
  const [inputOaiKey, setInputOaiKey] = useState("") // local state to handle user input
  const [oaiKeyFocus, setOaiKeyFocus] = useState(false) // New state to track if the input is focused
  const [oaiKeyValueDisplayed, setOaiKeyValueDisplayed] = useState("") // New state to hold the displayed value
  const [isKeyValid, setIsKeyValid] = useState(false) // New state variable to track if the key is valid

  useEffect(() => {
    if (oaiKeyFocus) {
      setOaiKeyValueDisplayed(inputOaiKey) // If the input is focused, show the real key
    } else {
      setOaiKeyValueDisplayed(inputOaiKey.replace(/./g, "*")) // If the input is not focused, replace all characters with *
    }
  }, [inputOaiKey, oaiKeyFocus])

  useEffect(() => {
    if (inputOaiKey.length > 50) {
      fetch(`/api/test_api?key=${inputOaiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setIsKeyValid(data.status)
          if (data.status === true) {
            setOaiKey(inputOaiKey) // Set the oaiKey state if valid
          } else {
            setOaiKey("") // Clear the oaiKey state if not valid
          }
        })
        .catch((error) => console.error("Error:", error))
    } else {
      setIsKeyValid(false)
      setOaiKey("") // Clear the oaiKey state if not valid
    }
  }, [inputOaiKey])

  const oaiKeyClassName = clsx(
    "placeholder:text-current border-current border-4 container flex flex-col gap-6 py-8 max-w-[15rem] md:max-w-[20rem] md:py-12 lg:py-5 mt-5",
    {
      "bg-green-400": isKeyValid,
      "bg-red-400": !isKeyValid,
    }
  )

  return (
    <div className="mb-[-50px] mt-[25px]">
      <label className="-mb-5 ml-[-110px] flex items-center justify-center font-bold  md:ml-[-190px]">
        OpenAI API Key:
      </label>
      <Input
        type="text"
        id="oaikey"
        placeholder="Enter Key Here."
        className={oaiKeyClassName}
        value={oaiKeyValueDisplayed}
        onChange={(e) => setInputOaiKey(e.target.value)}
        onFocus={() => setOaiKeyFocus(true)}
        onBlur={() => setOaiKeyFocus(false)}
      />
    </div>
  )
}
