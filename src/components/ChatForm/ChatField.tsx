import React, { useEffect } from "react"
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
  onRenderField: () => void
}

function ChatField({
  field,
  value,
  touched,
  error,
  onRenderField,
  onChange,
  onFocus,
  onBlur,
}: ChatFieldProps) {
  useEffect(() => {
    onRenderField()
  }, [])

  const inputProps = {
    value: value,
    onChange,
    onFocus,
    onBlur,
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
