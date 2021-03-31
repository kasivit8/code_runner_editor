import React from "react";
import './App.css';

import ReactMarkdown from "react-markdown";
import "antd/dist/antd.css";
import { Collapse, Menu, Layout, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Editors } from './Editor';

const { Panel } = Collapse;
const { Header, Content} = Layout;
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function App() {
  const markdown = `
  ## Python lab 1
  Make a **Palindrome** with _O(N)_ time complexity.
  ***
  `;
  return (
    <div className="App">
      <Collapse defaultActiveKey={['Markdown','Code']}>
        <Panel header="Markdown" key="Markdown">
          <h1 style={{textAlign:"center"}}>Markdown</h1>
          <ReactMarkdown source={markdown} />
        </Panel>

        <Panel header="Code" key="Code">
          <h1>Code</h1>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu 
              theme="dark" 
              mode="horizontal" 
              defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">C++</Menu.Item>
                <Menu.Item key="2">Python</Menu.Item>
                <Menu.Item key="3">Java</Menu.Item>
              </Menu>
            </Header>
            
            <Content style={{ textAlign: 'left' }}>
              <Editors />
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
            </Content>
          </Layout>
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
*/
