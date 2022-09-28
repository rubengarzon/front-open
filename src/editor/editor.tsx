import react from "react";

import HighLight, { defaultProps } from "prism-react-renderer";

interface EditorProps {
  language?: any;
  code?: any;
}

export const Editor = ({ language, code }: EditorProps) => {
  const codeExample = `
    (function someDemo() {
      console.log("Hello world!");
    })();
  `;

  return (
    <HighLight {...defaultProps} code={codeExample} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </HighLight>
  );
};
