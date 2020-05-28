import React, { useState } from "react"
import { ChatField } from "./types"
import ChatQuestion from "./ChatQuestion"

type ChatFormProps = {
  /** smallest possible delay in ms before the form replies */
  minDelay?: number
  /** longest possible delay in ms before the form replies */
  maxDelay?: number
  /**
   * */
  fields: ({ values: ChatFormData }) => ChatField[]
}

function ChatForm({ minDelay = 100, maxDelay = 300, fields }: ChatFormProps) {
  const [values, setValues] = useState({})
  const [currentField, setCurrentField] = useState("")
  const computedFields = fields({ values })

  const visibleIndex =
    computedFields.findIndex(field => field.name === currentField) || 0
  const visibleFields = computedFields.slice(0, visibleIndex + 1)

  return (
    <div className="flex flex-column">
      {visibleFields.map(field => (
        <ChatQuestion key={field.name}>{field.question}</ChatQuestion>
      ))}
    </div>
  )
}

export default ChatForm
