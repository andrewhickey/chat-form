import React, { useState } from "react"
import { ChatFormData } from "./types"

type ChatFormProps = {
  /** smallest possible delay in ms before the form replies */
  minDelay?: number
  /** longest possible delay in ms before the form replies */
  maxDelay?: number
  /**
   * children is a function containing the current data that the user has provided
   * this information can be used to customise the questions
   * questions will be asked in the order that they are listed
   * a question is any child with a name prop
   * */
  children: ({ values: ChatFormData }) => React.ReactNode
}

function ChatForm({
  minDelay = 100,
  maxDelay = 300,
  children: renderFunc,
}: ChatFormProps) {
  const [values, setValues] = useState({})
  const children = renderFunc({ values })

  return <div className="flex flex-column">{children}</div>
}

export default ChatForm
