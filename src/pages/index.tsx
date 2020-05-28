import React from "react"
import { Link } from "gatsby"
import { Layout, ChatForm } from "../components"
import Image from "../components/image"
import SEO from "../components/seo"
import * as Yup from "yup"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <ChatForm
        fields={({ values }) => [
          {
            name: "firstName",
            question: "What is your first name",
            initialValue: "",
            validationSchema: Yup.string()
              .email("Must be a valid email")
              .required("Please enter your e-mail address"),
            fieldType: "text",
          },
        ]}
      />
    </div>
  </Layout>
)

export default IndexPage
