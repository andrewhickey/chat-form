import React, { useState, useMemo, useEffect } from "react"
import { FieldDefinition, ChatFormData } from "./types"
import ChatQuestion from "./ChatBubble"
import ChatField from "./ChatField"

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
  fields,
}: ChatFormProps) {
  const [values, setValues] = useState(initialValues)
  const [focused, setFocused] = useState<{
    [name: string]: boolean
  }>({})
  const [touched, setTouched] = useState<{
    [name: string]: boolean
  }>({})
  const [errors, setErrors] = useState<{
    [name: string]: string
  }>({})

  useEffect(() => {
    validate(values).then(errors => setErrors(errors))
  }, [setErrors, validate, values])

  const computedFields = useMemo(() => fields({ values }), [fields, values])

  const [currentField, setCurrentField] = useState(computedFields[0]?.name)

  const visibleIndex = Math.max(
    computedFields.findIndex(field => field.name === currentField),
    0
  )

  const visibleFields = useMemo(
    () => computedFields.slice(0, visibleIndex + 1),
    [computedFields, visibleIndex]
  )

  const hasVisibleErrors = useMemo(
    () =>
      visibleFields.reduce((errorFound, field) => {
        if (errors[field.name]) {
          return true
        }
        return errorFound
      }, false),
    [errors, visibleFields]
  )

  /**
   * Moves the current field forward if the form so far is valid
   */
  useEffect(() => {
    console.log({
      touched: touched[currentField],
      hasVisibleErrors,
      focused: focused[currentField],
    })
    if (touched[currentField] && !hasVisibleErrors && !focused[currentField]) {
      const nextField = computedFields[visibleIndex + 1]
      if (nextField) {
        setCurrentField(nextField.name)
      }
    }
  }, [
    currentField,
    setCurrentField,
    touched,
    focused,
    hasVisibleErrors,
    visibleIndex,
    computedFields,
  ])

  const onChangeField = (name: string) => async (value: any) => {
    setTouched({ ...values, [name]: true })
    setValues({ ...values, [name]: value })
  }

  const onFocusField = (name: string) => () => {
    setFocused({ ...values, [name]: true })
  }

  const onBlurField = (name: string) => async () => {
    setFocused({ ...values, [name]: false })
  }

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
        />
      ))}
    </div>
  )
}

export default ChatForm
