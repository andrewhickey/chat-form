import * as React from "react"
import classNames from "classnames"

type QuestionProps = {
  children: React.ReactNode
  className?: string
}
function Question({ children, className }: QuestionProps) {
  return (
    <div className={classNames("bg-gray-300 p-6 rounded max-w-3/4", className)}>
      {children}
    </div>
  )
}

export default Question
