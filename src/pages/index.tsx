import React from "react"
import { Link } from "gatsby"
import { Layout, ChatForm, ChatQuestion } from "../components"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <ChatForm>
        {({ values }) => <ChatQuestion>What is your first name?</ChatQuestion>}
      </ChatForm>
    </div>
  </Layout>
)

export default IndexPage
