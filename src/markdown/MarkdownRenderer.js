import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";


export function MarkdownRenderer(props) {
  let { page } = useParams()
  return <MarkdownComponent path={"/" + page + ".md"} />
}


export class MarkdownComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { path: "", markdown: "Loading ..." };
  }

  componentDidMount() {
    this.setMarkdownText()
  }

  componentDidUpdate() {
    // With hash routing the component is not updated properly, even though props.path is changed.
    // Therefore this manual trigger of the change.
    if (this.props.path !== this.state.path) {
      this.setMarkdownText()
    }
  }

  setMarkdownText() {
    let { path } = this.props
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        if (text.startsWith("<!DOCTYPE")) { // TODO: do this in a less hacky way
          text = "# Page not found"
        }
        this.setState({ path, markdown: text})
      });
  }

  render() {
    const { markdown } = this.state;
    return <ReactMarkdown children={markdown} rehypePlugins={[rehypeRaw]} />;
  }
}
