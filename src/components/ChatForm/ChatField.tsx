import * as React from "react"
import ChatBubble from "./ChatBubble"
import { FieldDefinition } from "./types"

type ChatFieldProps = {
  field: FieldDefinition
  value: any
  error?: string
  touched: boolean
  onChange: (value: any) => void
  onFocus: () => void
  onBlur: () => void
}

function ChatField({
  field,
  value,
  touched,
  error,
  onChange,
  onFocus,
  onBlur,
}: ChatFieldProps) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    onChange(value)
  }

  const handleFocus = () => {
    onFocus()
  }

  const handleBlur = () => {
    onBlur()
  }

  return (
    <>
      <ChatBubble className="self-start">{field.question}</ChatBubble>
      <ChatBubble className="self-end">
        <input
          className="max-w-full"
          autoFocus
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {touched && error ? error : ""}
      </ChatBubble>
    </>
  )
}

export default ChatField
