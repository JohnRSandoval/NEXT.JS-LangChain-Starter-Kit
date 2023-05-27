import * as React from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function UserChatCard({ text = '' }) {
  return (
    <div className="flex items-end justify-end mr-[25px] mt-[20px] mb-[25px]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>{text}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
