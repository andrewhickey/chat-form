import React, { useState, useMemo, useEffect, useCallback } from "react"
import { FieldDefinition, ChatFormData } from "./types"
import ChatField from "./ChatField"
import useForm from "./useForm"

const findLastSeenIndex = (
  fields: FieldDefinition[],
  seen: { [key: string]: boolean }
) => {
  let lastValid = 0
  for (let index = 0; index < fields.length; index++) {
    const field = fields[index]
    if (seen[field.name]) {
      lastValid = index
    } else {
      return lastValid
    }
  }
  return lastValid
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
  fields: ({ values: any }) => FieldDefinition[]
  /** */
  onSubmit: ({ values: any }) => void
  validate: (values: any) => Promise<any>
}

function ChatForm({
  minDelay = 100,
  maxDelay = 300,
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

  const [seen, setSeen] = useState<{
    [name: string]: boolean
  }>({})

  const onRenderField = useCallback(
    (name: string) => () => {
      setSeen({ ...seen, [name]: true })
    },
    [seen]
  )

  const visibleFields = useMemo(() => {
    // by default show all fields that have been seen before
    const visibleIndex = findLastSeenIndex(fields, seen)

    // if all visible fields are valid
    // and the last field isn't focused
    // show one extra
    const isValid = !hasErrors(fields.slice(0, visibleIndex + 1), errors)
    console.log("FIELDS", fields)
    console.log("INDEX", visibleIndex)
    const isFocused = focused[fields[visibleIndex].name]
    console.log("ERRORS", errors)
    console.log("DATA", { isValid, isFocused })
    if (isValid && !isFocused) {
      return fields.slice(0, visibleIndex + 2)
    }
    return fields.slice(0, visibleIndex + 1)
  }, [fields, seen, errors, focused])

  return (
    <div className="flex flex-col space-y-6">
      {visibleFields.map(field => (
        <ChatField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          touched={touched[field.name]}
          onRenderField={onRenderField(field.name)}
          onChange={onChangeField(field.name)}
          onBlur={onBlurField(field.name)}
          onFocus={onFocusField(field.name)}
        />
      ))}
    </div>
  )
}

export default ChatForm
