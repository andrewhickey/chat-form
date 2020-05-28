import React from "react"
import * as Yup from "yup"
import { ChatForm, Layout } from "../components"
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
        }}
        fields={({ values }) => [
          {
            name: "firstName",
            question: "What is your first name?",
            validationSchema: Yup.string()
              .min(2, "Too short")
              .max(25, "Too long")
              .required("Please enter your name"),
            fieldType: "text",
          },
          {
            name: "age",
            question: "How old are you?",
            validationSchema: Yup.number().required("Please enter your age"),
            fieldType: "number",
          },
        ]}
      />
    </div>
  </Layout>
)

export default IndexPage
