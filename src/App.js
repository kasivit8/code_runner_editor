import React from "react";
import './App.css';

import ReactMarkdown from "react-markdown";
import "antd/dist/antd.css";
import { Collapse, Menu, Select, Layout, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Editors } from './Editor';

const { Panel } = Collapse;
const { Header, Content} = Layout;
const { Dragger } = Upload;
const { Option } = Select;

//for uploading files
const Dragger_props = {
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

function handleClick() {
  console.log('Click happened');
}

//for select option
function handleChange(value) {
  console.log(`selected ${value}`);
}
function onSearch(val) {
  console.log('search:', val);
}
function selectTheme(value) {
  console.log(`selected ${value}`);
  try {
    //set theme option
  } catch(e) {
    console.log('error',e);
  }
}

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
              selectable="false"
              //defaultSelectedKeys={["1"]}
              >
                <Menu.Item key="1">
                  <Select 
                  //defaultValue="editor" 
                  placeholder="Select upload type"
                  style={{ width: 180, padding: 10 }} 
                  onChange={handleChange}
                  >
                    <Option value="editor">Editor</Option>
                    <Option value="upload_files">Upload_files</Option>
                  </Select>
                  <Select 
                  showSearch
                  //defaultValue="C++" 
                  placeholder="Select a language"
                  style={{ width: 180, padding: 10 }} 
                  onChange={handleChange}
                  onSearch={onSearch}
                  >
                    <Option value="c++">C++</Option>
                    <Option value="java">Java</Option>
                    <Option value="python" disabled>
                      Python
                    </Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                  </Select>
                </Menu.Item>
                <Menu.Item key="2">
                  <Select 
                  showSearch
                  defaultValue="default" 
                  placeholder="Select Editor Theme"
                  style={{ width: 180, padding: 10 }} 
                  onChange={selectTheme}
                  onSearch={onSearch}
                  >
                    <Option disabled>Select Editor Theme</Option>
                    <Option value="default">default</Option>
                    <Option value="3024-day">3024-day</Option>
                    <Option value="3024-night">3024-night</Option>
                    <Option value="abcdef">abcdef</Option>
                    <Option value="ambiance">ambiance</Option>
                    <Option value="ayu-dark">ayu-dark</Option>
                    <Option value="ayu-mirage">ayu-mirage</Option>
                    <Option value="base16-dark">base16-dark</Option>
                    <Option value="base16-light">base16-light</Option>
                    <Option value="bespin">bespin</Option>
                    <Option value="blackboard">blackboard</Option>
                    <Option value="cobalt">cobalt</Option>
                    <Option value="colorforth">colorforth</Option>
                    <Option value="darcula">darcula</Option>
                    <Option value="dracula">dracula</Option>
                    <Option value="duotone-dark">duotone-dark</Option>
                    <Option value="duotone-light">duotone-light</Option>
                    <Option value="eclipse">eclipse</Option>
                    <Option value="elegant">elegant</Option>
                    <Option value="erlang-dark">erlang-dark</Option>
                    <Option value="gruvbox-dark">gruvbox-dark</Option>
                    <Option value="hopscotch">hopscotch</Option>
                    <Option value="icecoder">icecoder</Option>
                    <Option value="idea">idea</Option>
                    <Option value="isotope">isotope</Option>
                    <Option value="lesser-dark">lesser-dark</Option>
                    <Option value="liquibyte">liquibyte</Option>
                    <Option value="lucario">lucario</Option>
                    <Option value="material">material</Option>
                    <Option value="material-darker">material-darker</Option>
                    <Option value="material-palenight">material-palenight</Option>
                    <Option value="material-ocean">material-ocean</Option>
                    <Option value="mbo">mbo</Option>
                    <Option value="mdn-like">mdn-like</Option>
                    <Option value="midnight">midnight</Option>
                    <Option value="monokai">monokai</Option>
                    <Option value="moxer">moxer</Option>
                    <Option value="neat">neat</Option>
                    <Option value="neo">neo</Option>
                    <Option value="night">night</Option>
                    <Option value="nord">nord</Option>
                    <Option value="oceanic-next">oceanic-next</Option>
                    <Option value="panda-syntax">panda-syntax</Option>
                    <Option value="paraiso-dark">paraiso-dark</Option>
                    <Option value="paraiso-light">paraiso-light</Option>
                    <Option value="pastel-on-dark">pastel-on-dark</Option>
                    <Option value="railscasts">railscasts</Option>
                    <Option value="rubyblue">rubyblue</Option>
                    <Option value="seti">seti</Option>
                    <Option value="shadowfox">shadowfox</Option>
                    <Option value="solarized dark">solarized dark</Option>
                    <Option value="solarized light">solarized light</Option>
                    <Option value="the-matrix">the-matrix</Option>
                    <Option value="tomorrow-night-bright">tomorrow-night-bright</Option>
                    <Option value="tomorrow-night-eighties">tomorrow-night-eighties</Option>
                    <Option value="ttcn">ttcn</Option>
                    <Option value="twilight">twilight</Option>
                    <Option value="vibrant-ink">vibrant-ink</Option>
                    <Option value="xq-dark">xq-dark</Option>
                    <Option value="xq-light">xq-light</Option>
                    <Option value="yeti">yeti</Option>
                    <Option value="yonce">yonce</Option>
                    <Option value="zenburn">zenburn</Option>
                  </Select>
                </Menu.Item>
              </Menu>
            </Header>
            
            <Content style={{ textAlign: 'left' }}>
              <Editors />
              <Dragger {...Dragger_props}>
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
            <button onClick={handleClick}>Upload File</button>
          </Layout>
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
*/
