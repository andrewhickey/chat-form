import React, { useCallback, useMemo, useState, useEffect } from "react"
import ChatField from "./ChatField"
import { FieldDefinition } from "./types"
import { useForm } from "../../utils"

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
  /** smallest possible delay in ms before the form replies */
  minDelay?: number
  /** longest possible delay in ms before the form replies */
  maxDelay?: number
  /** */
  initialValues: any
  /** */
  fields: ({
    values,
  }: {
    values: { [name: string]: string }
  }) => FieldDefinition[]
  /** */
  onSubmit: ({ values }: { values: { [name: string]: string } }) => void
  validate: (values: { [name: string]: string }) => { [name: string]: string }
}

function ChatForm({
  minDelay = 400,
  maxDelay = 900,
  initialValues,
  validate,
  fields: getFields,
}: ChatFormProps) {
  const {
    values,
    focused,
    touched,
    errors,
    onChangeField,
    onFocusField,
    onBlurField,
  } = useForm({ initialValues, validate })

  const fields = useMemo(() => getFields({ values }), [getFields, values])
  const isValid = useMemo(() => !hasErrors(fields, errors), [fields, errors])
  const [history, setHistory] = useState<string[]>([])

  console.log("FIELDS", fields)
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
    console.log(currentField)
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

  return (
    <div className="flex flex-col space-y-6">
      {visibleFields.map(field => (
        <ChatField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          touched={touched[field.name]}
          onChange={onChangeField(field.name)}
          onBlur={onBlurField(field.name)}
          onFocus={onFocusField(field.name)}
          minDelay={minDelay}
          maxDelay={maxDelay}
        />
      ))}
    </div>
  )
}

export default ChatForm
