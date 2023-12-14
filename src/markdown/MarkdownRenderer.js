import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";


export function MarkdownRenderer(props) {
  let { page } = useParams()
  return <MarkdownComponent path={"/" + page + ".md"} />
}


export class MarkdownComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { markdown: "Loading ..." };
  }

  componentDidMount() {
    console.log(this.props.path)
    fetch(this.props.path)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return <ReactMarkdown children={markdown} />;
  }
}
