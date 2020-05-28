import * as React from "react"
import ChatBubble from "./ChatBubble"
import { FieldDefinition } from "./types"
import BasicInput from "../BasicInput"
import classNames from "classnames"

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

  const inputProps = {
    value: value,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    className: classNames({
      "border-red-600": touched && error,
    }),
    autoFocus: true,
  }

  return (
    <>
      <ChatBubble className="self-start">{field.question}</ChatBubble>
      <ChatBubble className="self-end">
        {field.fieldType === "text" && (
          <BasicInput {...inputProps} type="text" />
        )}
        {field.fieldType === "number" && (
          <BasicInput {...inputProps} type="number" />
        )}
        {touched && error ? (
          <span className="mt-3 text-red-600">{error}</span>
        ) : null}
      </ChatBubble>
    </>
  )
}

export default ChatField
