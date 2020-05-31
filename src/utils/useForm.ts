import { useMemo, useState, useCallback } from "react"

type UseFormInput = {
  onSubmit: ({ values }: { values: { [name: string]: string } }) => void
  validate: (values: { [name: string]: string }) => { [name: string]: string }
  initialValues: any
}
const useForm = ({ validate, initialValues, onSubmit }: UseFormInput) => {
  const [values, setValues] = useState(initialValues)
  const [focused, setFocused] = useState<{
    [name: string]: boolean
  }>({})
  const [touched, setTouched] = useState<{
    [name: string]: boolean
  }>({})

  const errors = useMemo(() => validate(values), [validate, values])

  const handleChangeField = useCallback(
    (name: string) => (value: any) => {
      setTouched({ ...touched, [name]: true })
      setValues({ ...values, [name]: value })
    },
    [touched, values]
  )

  const handleFocusField = useCallback(
    (name: string) => () => {
      setFocused({ ...focused, [name]: true })
    },
    [focused]
  )

  const handleBlurField = useCallback(
    (name: string) => () => {
      setFocused({ ...focused, [name]: false })
    },
    [focused]
  )

  const handleSubmit = useCallback(() => {
    onSubmit(values)
  }, [focused])

  return {
    values,
    focused,
    touched,
    errors,
    handleChangeField,
    handleFocusField,
    handleBlurField,
    handleSubmit,
  }
}

export default useForm
