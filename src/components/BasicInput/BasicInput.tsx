import classNames from "classnames"
import React from "react"

type BasicInputProps = {
  onChange: (value: any) => void
  onFocus: () => void
  onBlur: () => void
}
function BasicInput({
  className,
  onChange,
  onFocus,
  onBlur,
  ...inputProps
}: BasicInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const handleFocus = () => {
    onFocus()
  }

  const handleBlur = () => {
    onBlur()
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    onChange(value)
  }

  return (
    <input
      {...inputProps}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames(
        "max-w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
        className
      )}
    />
  )
}

export default BasicInput
