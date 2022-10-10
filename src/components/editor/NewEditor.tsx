import React, { Fragment, useState } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const codeSnippet = `
  import axios from "axios";

  const getUser = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users/1");
  };
`;

// Define Styles from Editor
const styles: any = {
  root: {
    boxSizing: "border-box",
    fontFamily: '"Fira code", "Fira Mono", monospace',
    ...theme.plain,
  },
};

// Hightlight Component
const HighlightElement = (code: string) => {
  <Highlight {...defaultProps} code={codeSnippet} language="tsx" theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Fragment>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Fragment>
    )}
  </Highlight>;
};

export const NewEditor = () => {
  const [code, setCode] = useState(codeSnippet);

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <Editor
      value={code}
      onValueChange={handleChange}
      highlight={HighlightElement}
      padding={10}
      style={styles.root}
    />
  );
};
