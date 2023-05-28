# NEXT.JS + LangChain Chat Starter Kit

The motivation behind this project was a perceived complexity in existing templates and starter kits for langchain chatbots. With a desire for simplicity, I've constructed this kit as an antidote to that complexity! This project serves as a foundation or a source of inspiration for your own endeavors.

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

* chatBox.tsx - Ready to go out the box.
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
* assistantChat.tsx - Is a card-like component that takes a text prop and returns the card with the text.
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
* userChat.tsx - Is a card-like component that takes a text prop and returns the card with the text.
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
## Contributing

Since this projects goal is to help each other learn langchain and next.js, feel free to make a PR for any changes. Not all PR's will be approved.

## License

[MIT](https://choosealicense.com/licenses/mit/) 