import React, { useCallback, useMemo, useState } from "react"
import ChatField from "./ChatField"
import { FieldDefinition } from "./types"
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
    const isFocused = focused[fields[visibleIndex].name]

    if (isValid && !isFocused) {
      return fields.slice(0, visibleIndex + 2)
    }
    return fields.slice(0, visibleIndex + 1)
  }, [fields, seen, errors, focused])

  console.log("IS VALID", isValid)
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
          minDelay={minDelay}
          maxDelay={maxDelay}
        />
      ))}
    </div>
  )
}

export default ChatForm
