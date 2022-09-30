import react from "react";

import HighLight, { defaultProps } from "prism-react-renderer";

interface EditorProps {
  language?: any;
  code?: any;
  solution?: any;
}

export const Editor = ({ code, language, solution }: EditorProps) => {
  return (
    <HighLight {...defaultProps} code={code} language="typescript">
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
