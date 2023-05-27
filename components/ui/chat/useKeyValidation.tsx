import { useEffect, useState } from "react"

const useKeyValidation = (initialKey: string) => {
  const [inputKey, setInputKey] = useState(initialKey)
  const [keyFocus, setKeyFocus] = useState(false)
  const [keyValueDisplayed, setKeyValueDisplayed] = useState("")
  const [isKeyValid, setIsKeyValid] = useState(false)

  useEffect(() => {
    setKeyValueDisplayed(keyFocus ? inputKey : inputKey.replace(/./g, "*"))
  }, [inputKey, keyFocus])

  useEffect(() => {
    if (inputKey.length > 50) {
      fetch(`/api/test_api?key=${inputKey}`)
        .then((response) => response.json())
        .then((data) => {
          setIsKeyValid(data.status)
          if (data.status) setInputKey(inputKey)
          else setInputKey("")
        })
        .catch((error) => console.error("Error:", error))
    } else {
      setIsKeyValid(false)
      setInputKey("")
    }
  }, [inputKey])

  return {
    inputKey,
    setInputKey,
    keyFocus,
    setKeyFocus,
    keyValueDisplayed,
    isKeyValid,
  }
}

export default useKeyValidation
