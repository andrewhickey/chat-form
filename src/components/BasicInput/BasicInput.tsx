import classNames from "classnames"
import React from "react"

function BasicInput({
  className,
  ...inputProps
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...inputProps}
      className={classNames(
        "max-w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
        className
      )}
    />
  )
}

export default BasicInput
