import * as React from "react"

type QuestionProps = {
  children: React.ReactNode
}
function Question({ children }: QuestionProps) {
  return <div className="self-start bg-gray-300 p-6 rounded">{children}</div>
}

export default Question
