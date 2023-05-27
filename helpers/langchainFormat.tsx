import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from "langchain/schema"

export default function formatMessages(
  userList: string[],
  assistantList: string[],
  PROMPT: string
) {
  const formatted_messages: (
    | HumanChatMessage
    | SystemChatMessage
    | AIChatMessage
  )[] = [new SystemChatMessage(PROMPT)]

  for (let i = 0; i < assistantList.length; i++) {
    formatted_messages.push(new AIChatMessage(assistantList[i]))
    if (i < userList.length) {
      formatted_messages.push(new HumanChatMessage(userList[i]))
    }
  }

  if (userList.length > assistantList.length) {
    formatted_messages.push(new HumanChatMessage(userList[userList.length - 1]))
  }

  return formatted_messages
}
