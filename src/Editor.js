import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Menu, Select, Layout, Upload, message } from "antd";
import "antd/dist/antd.css";
import { InboxOutlined } from "@ant-design/icons";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");

//require all css files in "codemirror/theme"
var themes = require.context(
  "../node_modules/codemirror/theme",
  false,
  /\.css$/
);
themes.keys().forEach(themes);

//reqire codemirror addons
require("codemirror/addon/selection/active-line");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/fold/foldcode");
require("codemirror/addon/fold/foldgutter");
require("codemirror/addon/fold/foldgutter.css");
require("codemirror/addon/fold/brace-fold");
require("codemirror/addon/fold/comment-fold");
require("codemirror/addon/fold/indent-fold");
require("codemirror/addon/mode/loadmode");
require("codemirror/addon/mode/loadmode");

const { Header, Content } = Layout;
const { Dragger } = Upload;
const { Option } = Select;

//for uploading files
const Dragger_props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const DEFAULT_CPP_VALUE = `#include "RandomIntGenerator.hpp"
RandomIntGenerator::RandomIntGenerator() {
	*this = RandomIntGenerator(0, INT_MAX);
}
RandomIntGenerator::RandomIntGenerator(int min, int max) {
	setMaxMin(min, max); srand(time(NULL));
}`;

const DEFAULT_PYTHON_VALUE = `class Building:
  def __init__(self,address="1234 Main St.",sq_ft="925 sq ft"):
    self.address=address
    self.sq_ft=sq_ft
  def __repr__(self):
    return "Building:" + self.address + self.sq_ft

class Residential(Building):
  def __init__(self,address="1234 Main St.",sqft="925 sq ft",num_bedrooms=1):
    super().__init__()
    self.num_bedrooms= num_bedrooms
  def __repr__(self):
    return "Building:" + self.address + self.sq_ft + "\\nResidential:" + str(self.num_bedrooms)

if __name__ == "__main__":
  B1=Building()
  R1=Residential()
  print("Building Class:")
  print(B1)
  print()
  print("Residential Class:")
  print(R1)
`;

const DEFAULT_JAVA_VALUE = `public class Mediator {
  private Buyer buyer;
  private AmericanSeller seller;
  private DollarConverter converter;
  
  public void registerFrenchBuyer(FrenchBuyer buyer) {
      this.buyer = buyer;
  }
  
  public void registerSwedishBuyer(SwedishBuyer buyer) {
      this.buyer = buyer;
  }
  
  public void registerAmericanSeller(AmericanSeller seller) {
      this.seller = seller;
  }
  
  public void registerDollarConverter(DollarConverter converter) {
      this.converter = converter;
  }
  
  public boolean placeBid(float bid, String unitOfCurrency) {
      float dollars = this.converter.convertCurrencyToDollars(bid, unitOfCurrency);
      return seller.isBidAccepted(dollars);
  }
}
`;

const DEFAULT_CPP_OPTIONS = {
  mode: "text/x-c++src",
  //theme: "darcula",
  autoCloseBrackets: true,
  matchBrackets: true,
  highlightSelectionMatches: true,
  styleActiveLine: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  cursorScrollMargin: 48,
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  viewportMargin: Infinity,
};

const DEFAULT_PYTHON_OPTIONS = {
  mode: "python",
  theme: "twilight",
  autoCloseBrackets: true,
  matchBrackets: true,
  highlightSelectionMatches: true,
  styleActiveLine: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  cursorScrollMargin: 48,
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  spellcheck: true,
};

const DEFAULT_JAVA_OPTIONS = {
  mode: "text/x-java",
  theme: "panda-syntax",
  autoCloseBrackets: true,
  matchBrackets: true,
  highlightSelectionMatches: true,
  styleActiveLine: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  cursorScrollMargin: 48,
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
};

//for select option
function handleChange(value) {
  console.log(`selected ${value}`);
}
function onSearch(val) {
  console.log("search:", val);
}
function handleClick() {
  console.log("Click happened");
}

export class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cppValue: DEFAULT_CPP_VALUE || this.props.cppValue,
      pythonValue: DEFAULT_PYTHON_VALUE || this.props.pythonValue,
      javaValue: DEFAULT_JAVA_VALUE || this.props.javaValue,
      themeValue: "default",
      modeValue: "cpp",
      uploadType: "editor",
      showEditor: false,
      showUpload: false,
    };
    this.instance = null;
  }

  cppOptions = {
    ...DEFAULT_CPP_OPTIONS,
    ...this.props.cppOptions,
  };

  pythonOptions = {
    ...DEFAULT_PYTHON_OPTIONS,
    ...this.props.pythonOptions,
  };

  javaOptions = {
    ...DEFAULT_JAVA_OPTIONS,
    ...this.props.javaOptions,
  };

  onChange = (which) => (editor, data, value) => {
    this.setState({ [`${which}Value`]: value });
    //this.instance.setValue(this.state.pythonValue);
    //this.instance.setOption();
    this.instance.setOption("theme", this.state.themeValue);
    this.instance.refresh();
  };

  selectUpload = (value) => {
    console.log(`Upload type selected: ${value}`);
    try {
      this.setState({ uploadType: value }, () => {
        switch (value) {
          case "editor":
            this.setState({showEditor: true});
            this.setState({showUpload: false});
            break;
          case "upload_files":
            this.setState({showEditor: false});
            this.setState({showUpload: true});
            break;
          default:
            this.setState({showEditor: !this.state.showEditor});
            this.setState({showUpload: !this.setState.showUpload});
            break;
        }
      });
      
    } catch (e) {
      console.log("error", e);
    }
  };

  selectMode = (value) => {
    console.log(`mode selected: ${value}`);
    try {
      //set language option
      this.setState({ modeValue: value }, () => {
        
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  selectTheme = (value) => {
    console.log(`theme selected: ${value}`);
    try {
      //set theme option
      this.setState({ themeValue: value }, () => {
        this.instance.setOption("theme", this.state.themeValue);
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    
    return (
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
                onChange={this.selectUpload}
              >
                <Option value="editor">Editor</Option>
                <Option value="upload_files">Upload_files</Option>
              </Select>
              <Select
                showSearch
                //defaultValue="C++"
                placeholder="Select a language"
                style={{ width: 180, padding: 10 }}
                onChange={this.selectMode}
                onSearch={onSearch}
              >
                <Option value="cpp">C++</Option>
                <Option value="java">Java</Option>
                <Option value="python">Python</Option>
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
                onChange={this.selectTheme}
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
                <Option value="tomorrow-night-bright">
                  tomorrow-night-bright
                </Option>
                <Option value="tomorrow-night-eighties">
                  tomorrow-night-eighties
                </Option>
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

        <Content style={{ textAlign: "left" }}>
          {this.state.showEditor && (
            <React.Fragment>
            <CodeMirror
              name={this.state.modeValue}
              value={this.state.cppValue}
              options={this.cppOptions}
              editorDidMount={(editor) => {
                this.instance = editor;
              }}
              onBeforeChange={this.onChange(this.state.modeValue)}
              onChange={(editor, metadata, value) => {}}
            />
          </React.Fragment>
          )}
          {this.state.showUpload && (
          <Dragger {...Dragger_props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          )}
        </Content>
        <button onClick={handleClick}>Upload</button>
      </Layout>
    );
  }
}