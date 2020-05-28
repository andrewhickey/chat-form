import React, { useState } from "react"
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
}

function ChatForm({
  minDelay = 100,
  maxDelay = 300,
  initialValues,
  fields,
}: ChatFormProps) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [currentField, setCurrentField] = useState("")

  const computedFields = fields({ values })

  const visibleIndex = Math.max(
    computedFields.findIndex(field => field.name === currentField),
    0
  )

  const visibleFields = computedFields.slice(0, visibleIndex + 1)

  const validateField = (name: string) => (value: any) => {
    const fieldDefinition = computedFields.find(field => field.name === name)
    if (fieldDefinition) {
      try {
        fieldDefinition.validationSchema.validateSync(value)
        return ""
      } catch (error) {
        return error.errors.join(", ")
      }
    }
  }

  const onChangeField = (name: string) => (value: any) => {
    setValues({ ...values, [name]: value })
    const error = validateField(name)(value)
    setErrors({ ...errors, [name]: error })
  }

  const onBlurField = (name: string) => () => {
    // is the field valid?
    const error = validateField(name)(values[name])
    setErrors({ ...errors, [name]: error })

    if (!error) {
      // if so, is there a next field?
      const nextField = computedFields[visibleIndex + 1]
      if (nextField) {
        setCurrentField(nextField.name)
      }
    }
  }

  const onFocusField = (name: string) => () => {
    setTouched({ ...values, [name]: true })
  }

  return (
    <div className="flex flex-col space-y-6">
      {visibleFields.map(field => (
        <ChatField
          key={field.name}
          field={field}
          value={values[field.name] || initialValues[field.name]}
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
