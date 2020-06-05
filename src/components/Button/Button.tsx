import React from "react"
import classNames from "classnames"

function Button({ className, ...buttonProps }: React.ComponentProps<"button">) {
  return (
    <button
      {...buttonProps}
      className={classNames(
        "hover:bg-blue-700 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
        className
      )}
    />
  )
}

export default Button
