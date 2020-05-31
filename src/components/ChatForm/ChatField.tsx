import React, { useEffect, useState } from "react"
import ChatBubble from "./ChatBubble"
import { FieldDefinition } from "./types"
import BasicInput from "../BasicInput"
import SelectButtonGroup from "../SelectButtonGroup"
import classNames from "classnames"

type ChatFieldProps = {
  field: FieldDefinition
  value: any
  error?: string
  touched: boolean
  onChange: (value: any) => void
  onFocus: () => void
  onBlur: () => void
  disabled: boolean
  minDelay: number
  maxDelay: number
}

function ChatField({
  field,
  value,
  touched,
  error,
  onChange,
  onFocus,
  onBlur,
  disabled,
  minDelay,
  maxDelay,
}: ChatFieldProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const delay = Math.random() * maxDelay - minDelay + minDelay
    setTimeout(() => {
      setIsLoading(false)
    }, delay)
  }, [])

  const inputProps = {
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
  }

  if (isLoading) {
    return <ChatBubble className="self-start">...</ChatBubble>
  }

  return (
    <>
      <ChatBubble className="self-start">{field.question}</ChatBubble>
      <ChatBubble className="self-end">
        {field.fieldType === "text" && (
          <BasicInput
            {...inputProps}
            className={classNames({
              "border-red-600": touched && error,
            })}
            autoFocus
            type="text"
          />
        )}
        {field.fieldType === "number" && (
          <BasicInput
            {...inputProps}
            value={value || ""}
            className={classNames({
              "border-red-600": touched && error,
            })}
            autoFocus
            type="number"
          />
        )}
        {field.fieldType === "boolean" && (
          <SelectButtonGroup
            {...inputProps}
            options={[
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ]}
          />
        )}

        {touched && error ? (
          <span className="mt-3 text-red-600">{error}</span>
        ) : null}
      </ChatBubble>
    </>
  )
}

export default ChatField
