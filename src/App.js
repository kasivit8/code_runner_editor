import React from "react";
import './App.css';

import ReactMarkdown from "react-markdown";
import "antd/dist/antd.css";
import { Collapse } from 'antd';

import { Editors } from './Editor';

const { Panel } = Collapse;

function App() {

  const markdown = `
  # PythonLab 1
  ## Question 1
  Make a **Palindrome** with _O(N)_ time complexity.
  ***
  `;
  return (
    <div className="App">
      <Collapse defaultActiveKey={['Markdown','Code']}>
        <Panel header="Markdown" key="Markdown">
          <ReactMarkdown source={markdown} />
        </Panel>

        <Panel header="Code" key="Code">
          <h1>Code</h1>
          <Editors />
        </Panel>

        <Panel header="Result" key="Result">
          <p>lorem</p>
        </Panel>
      </Collapse>
    </div>
  );
}

export default App;

/*
References:
https://reactjs.org/docs/create-a-new-react-app.html
https://ant.design/components/overview/
https://codesandbox.io/s/mow7x4zyqx?file=/src/StyledEditor.js:32-93
https://www.npmjs.com/package/react-codemirror2
https://codesandbox.io/s/nnw8njy64j?file=/src/index.js
https://www.youtube.com/watch?v=fF9vrZNSQC4&ab_channel=CoderOne
https://www.newline.co/@dmitryrogozhny/how-to-render-markdown-in-react-with-react-markdown--5d1c3849
https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial
https://github.com/scniro/react-codemirror2/issues/83
https://github.com/JedWatson/react-codemirror
https://codemirror.net/doc/manual.html#config
https://codemirror.net/doc/manual.html#addons
*/
