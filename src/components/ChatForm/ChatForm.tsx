import React, { useEffect, useMemo, useState, useCallback } from "react"
import { useForm } from "../../utils"
import Button from "../Button"
import ChatBubble from "./ChatBubble"
import ChatField from "./ChatField"
import { FieldDefinition } from "./types"

const findLast = (array: string[], predicate: (value: string) => boolean) => {
  for (let index = array.length - 1; index >= 0; index--) {
    const value = array[index]
    if (predicate(value)) {
      return value
    }
  }
}

const hasErrors = (
  fields: FieldDefinition[],
  errors: { [key: string]: string }
) => {
  return fields.reduce((hasError, field) => {
    if (errors[field.name]) {
      return true
    }
    return hasError
  }, false)
}

type ChatFormProps = {
  minDelay?: number
  maxDelay?: number
  initialValues: any
  fields: ({
    values,
  }: {
    values: { [name: string]: string }
  }) => FieldDefinition[]
  onSubmit: ({ values }: { values: { [name: string]: string } }) => void
  validate: (values: { [name: string]: string }) => { [name: string]: string }
}

function ChatForm({
  minDelay = 400,
  maxDelay = 900,
  initialValues,
  validate,
  onSubmit,
  fields: getFields,
}: ChatFormProps) {
  const {
    values,
    focused,
    touched,
    errors,
    handleChangeField,
    handleFocusField,
    handleBlurField,
    handleSubmit,
  } = useForm({ initialValues, validate, onSubmit })

  const fields = useMemo(() => getFields({ values }), [getFields, values])
  const isValid = useMemo(() => !hasErrors(fields, errors), [fields, errors])
  const [history, setHistory] = useState<string[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)

  const currentField =
    findLast(history, fieldName => {
      return !!fields.find(field => field.name === fieldName)
    }) || fields[0].name

  const currentIndex = fields.findIndex(field => field.name === currentField)

  const visibleFields = fields.slice(0, currentIndex + 1)

  // if the last field is unfocused
  // and the visible form is valid
  // move the form on one item
  useEffect(() => {
    if (currentField) {
      const isFocused = focused[currentField]
      const isValid = !hasErrors(visibleFields, errors)

      if (!isFocused && isValid) {
        const nextField = fields[currentIndex + 1]
        if (nextField) {
          setHistory([...history, nextField.name])
        }
      }
    }
  }, [errors, visibleFields, focused, currentField, currentIndex, history])

  const handleDone = useCallback(() => {
    handleSubmit()
    setIsDone(true)
  }, [handleSubmit, setIsDone])

  return (
    <div className="flex flex-col space-y-6">
      {visibleFields.map(field => (
        <ChatField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          touched={touched[field.name]}
          onChange={handleChangeField(field.name)}
          onBlur={handleBlurField(field.name)}
          onFocus={handleFocusField(field.name)}
          minDelay={minDelay}
          maxDelay={maxDelay}
          disabled={isDone}
        />
      ))}

      {isValid && (
        <ChatBubble className="self-end">
          <Button onClick={handleDone} disabled={isDone}>
            Done
          </Button>
        </ChatBubble>
      )}
      {isDone && (
        <ChatBubble className="self-end">
          That's everything we need. Thanks!
        </ChatBubble>
      )}
    </div>
  )
}

export default ChatForm
