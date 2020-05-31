import { useMemo, useState, useCallback } from "react"

const useForm = ({ validate, initialValues }) => {
  const [values, setValues] = useState(initialValues)
  const [focused, setFocused] = useState<{
    [name: string]: boolean
  }>({})
  const [touched, setTouched] = useState<{
    [name: string]: boolean
  }>({})

  const errors = useMemo(() => validate(values), [validate, values])

  const onChangeField = useCallback(
    (name: string) => async (value: any) => {
      setTouched({ ...touched, [name]: true })
      setValues({ ...values, [name]: value })
    },
    [touched, values]
  )

  const onFocusField = useCallback(
    (name: string) => () => {
      setFocused({ ...focused, [name]: true })
    },
    [focused]
  )

  const onBlurField = useCallback(
    (name: string) => async () => {
      setFocused({ ...focused, [name]: false })
    },
    [focused]
  )

  return {
    values,
    focused,
    touched,
    errors,
    onChangeField,
    onFocusField,
    onBlurField,
  }
}

export default useForm
