import React from "react"
import { string as YupString, Schema } from "yup"

export type FieldType = "text" | "select" | "boolean" | "number"

export type FieldDefinition = {
  name: string
  question: React.ReactNode
  fieldType: FieldType
  validationSchema: Schema<any>
}

export type ChatFormData = {
  ["fieldName"]: {
    value: any
  }
}
