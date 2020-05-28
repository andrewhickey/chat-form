import React from "react"
import { string as YupString, Schema } from "yup"

export type FieldType = "text" | "select" | "boolean"

export type ChatField = {
  name: string
  question: React.ReactNode
  fieldType: FieldType
  initialValue: any
  validationSchema: Schema<any>
}

export type ChatFormData = {
  ["fieldName"]: {
    value: any
  }
}
