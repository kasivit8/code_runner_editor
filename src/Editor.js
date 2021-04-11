import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");

//require all css files in "codemirror/theme"
var themes = require.context('../node_modules/codemirror/theme', false, /\.css$/);
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

const DEFAULT_CPP_VALUE = `#include "RandomIntGenerator.hpp"
RandomIntGenerator::RandomIntGenerator() {
	*this = RandomIntGenerator(0, INT_MAX);
}
RandomIntGenerator::RandomIntGenerator(int min, int max) {
	setMaxMin(min, max); srand(time(NULL));
}`

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
`

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
`

const DEFAULT_CPP_OPTIONS = {
  mode: "text/x-c++src",
  theme: "darcula",
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

export class Editors extends React.Component {

  state = {
    cppValue: DEFAULT_CPP_VALUE || this.props.cppValue,
    pythonValue: DEFAULT_PYTHON_VALUE || this.props.pythonValue,
    javaValue: DEFAULT_JAVA_VALUE || this.props.javaValue,
  };
  
  cppOptions = {
    ...DEFAULT_CPP_OPTIONS,
    ...this.props.cppOptions
  };

  pythonOptions = {
    ...DEFAULT_PYTHON_OPTIONS,
    ...this.props.pythonOptions
  };

  javaOptions = {
    ...DEFAULT_JAVA_OPTIONS,
    ...this.props.javaOptions
  };

  onChange = which => (editor, data, value) => {
    this.setState({ [`${which}Value`]: value });
  };

  setTheme(value) {
    this.editor.setOption('theme', value);
  }

  
  render() {
    return (
      <React.Fragment>
        <PureEditor
          name="cpp"
          value={this.state.cppValue}
          options={this.cppOptions}
          onChange={this.onChange("cpp")}
        />
        
      </React.Fragment>
    );
  }
}
/*
        <PureEditor
          name="java"
          value={this.state.javaValue}
          options={this.javaOptions}
          onChange={this.onChange("java")}
        />
        <PureEditor
          name="python"
          value={this.state.pythonValue}
          options={this.pythonOptions}
          onChange={this.onChange("python")}
        />
*/
class PureEditor extends React.PureComponent {
  render() {
    console.log(`rendering -> ${this.props.name}`);
    return (
      <CodeMirror 
      value = {this.props.value}
      options = {this.props.options}
      onBeforeChange={this.props.onChange}
      />
    )
  }
}
