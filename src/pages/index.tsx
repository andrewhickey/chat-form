import React from "react"
import * as Yup from "yup"
import { ChatForm, Layout } from "../components"
import { validateSchema } from "../utils"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <ChatForm
        onSubmit={({ values }) => {
          console.log("VALUES", values)
        }}
        initialValues={{
          firstName: "",
          age: null,
          significantOther: null,
          significantOtherName: "",
        }}
        validate={validateSchema(
          Yup.object({
            significantOther: Yup.boolean().required(),
            significantOtherName: Yup.string().when("significantOther", {
              is: true,
              then: Yup.string()
                .min(2, "Too short")
                .max(25, "Too long")
                .required("Please enter  significant other's name"),
            }),
            firstName: Yup.string()
              .min(2, "Too short")
              .max(25, "Too long")
              .required("Please enter your name"),
            age: Yup.number()
              .transform(value => (isNaN(value) ? undefined : value))
              .min(0, "Only positive ages please")
              .required("Please enter your age"),
          })
        )}
        fields={({ values }) => [
          {
            name: "significantOther",
            question: "Do you have a significant other?",
            fieldType: "boolean",
          },
          ...(values.significantOther
            ? [
                {
                  name: "significantOtherName",
                  question: "What is your significant other's name?",
                  fieldType: "text",
                },
              ]
            : []),
          {
            name: "firstName",
            question: "What is your first name?",
            fieldType: "text",
          },
          {
            name: "age",
            question: "How old are you?",
            fieldType: "number",
          },
        ]}
      />
    </div>
  </Layout>
)

export default IndexPage
