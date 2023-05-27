export default function formatMessages(
  userList: string[],
  assistantList: string[],
  PROMPT: string
) {
  const formatted_messages: {
    role: "system" | "user" | "assistant"
    content: string
  }[] = [{ role: "system", content: PROMPT }]

  for (let i = 0; i < assistantList.length; i++) {
    formatted_messages.push({
      role: "assistant" as "assistant",
      content: assistantList[i],
    })
    if (i < userList.length) {
      formatted_messages.push({ role: "user" as "user", content: userList[i] })
    }
  }

  if (userList.length > assistantList.length) {
    formatted_messages.push({
      role: "user" as "user",
      content: userList[userList.length - 1],
    })
  }

  return formatted_messages
}
