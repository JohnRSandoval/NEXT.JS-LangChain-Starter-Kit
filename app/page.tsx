import Image from 'next/image'
import { Camera } from 'lucide-react';
import { ChatBox } from '@/components/ui/chat/chatBox'

export default function Home() {
  return (
    <section>
      <div className='flex items-center justify-center'>
      <ChatBox />
      </div>
    </section>
  )
}
