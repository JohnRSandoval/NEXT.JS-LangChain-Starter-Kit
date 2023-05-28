# NEXT.JS + LangChain Chat Starter Kit

The motivation behind this project was a perceived complexity in existing templates and starter kits for langchain chatbots. With a desire for simplicity, I've constructed this kit as an antidote to that complexity! This project serves as a foundation or a source of inspiration for your own endeavors.

## Images
<center>
<img src="https://i.imgur.com/5RHXcQj.jpg" width='550px'>
<br></br>
<img src="https://i.imgur.com/B0sJyiG.jpg" width='550px'>
</center>

## Installation

1. Clone this repo via git to use the components.

```bash
git clone https://github.com/JohnRSandoval/NEXT.JS-LangChain-Starter-Kit.git
```

2. Navigate to the cloned folder.

```bash
cd NEXT.JS-LangChain-Starter-Kit
```

3. Use your preferred package manager to install packages.

```bash
npm i
```

## Run Development

```bash
npm run dev
```

## Fix TailWind Issues

```bash
npx prettier --write .
```



## Usage

## chatBox.tsx 
Ready to go out the box. We **recommended** using and changing the UI elements in this component as this has everything working together.
```typescript
import { ChatBox } from "@/components/ui/chat/chatBox"

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <ChatBox />
      </div>
    </section>
  )
}
```
## assistantChat.tsx
Card-like component that takes a text prop and returns the card with the text.
```typescript
import { AssistantChatCard} from "@/components/ui/chat/assistantChat"

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <AssistantChatCard text="hi" />
      </div>
    </section>
  )
}
```
## userChat.tsx
Card-like component that takes a text prop and returns the card with the text.
```typescript
import { UserChatCard} from "@/components/ui/chat/userChat"

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <UserChatCard text="hi" />
      </div>
    </section>
  )
}
```

## openAPIKeyInput.tsx
Input compenent, uses /api/test_api to verify if the key is valid.
```typescript
import { OpenAIAPIKeyInput } from "./openaiAPIKeyInput"

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
       <OpenAIAPIKeyInput oaiKey={oaiKey} setOaiKey={setOaiKey} />
      </div>
    </section>
  )
}
```
## messageInput.tsx
Input compenent, that takes in user input for the chat, can be disabled or loading with props to control different actions.
```typescript
import { MessageInput } from "./MessageInput"

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <MessageInput
          isDisabled={isDisabled}
          isLoading={isLoading}
          inputText={inputText}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          setInputText={setInputText}
        />
      </div>
    </section>
  )
}
```
## ChatWindow.tsx
Scroll area conponent, used to house the chat elements and enable chat scrolling.
```typescript
import { ChatWindow } from "./ChatWindow"
     

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <ChatWindow messages={messages} scrollAreaRef={scrollAreaRef} />
      </div>
    </section>
  )
}
```
## Contributing

Since this projects goal is to help each other learn langchain and next.js, feel free to make a PR for any changes. Not all PR's will be approved.

## License

[MIT](https://choosealicense.com/licenses/mit/) 