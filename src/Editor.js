import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");

const DEFAULT_CPP_VALUE = `#include "RandomIntGenerator.hpp"
RandomIntGenerator::RandomIntGenerator() {
	*this = RandomIntGenerator(0, INT_MAX);
}
RandomIntGenerator::RandomIntGenerator(int min, int max) {
	setMaxMin(min, max); srand(time(NULL));
}`

const DEFAULT_PY_VALUE = `class Building:
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
    return "Building:" + self.address + self.sq_ft + "\nResidential:" + str(self.num_bedrooms)

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
  autoCloseBrackets: true,
  matchBrackets: true,
  cursorScrollMargin: 48,
  mode: "text/x-c++src",
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99
};

const DEFAULT_PY_OPTIONS = {
  mode: {name: "python",version: 3,singleLineStringErrors: false},
  lineNumbers: true,
  highlightSelectionMatches: true,
  indentUnit: 4,
  tabSize: 4,
  lineWrapping: true,
  matchBrackets: true,
  autoCloseBrackets: true,
};

const DEFAULT_JAVA_OPTIONS = {
  autoCloseBrackets: true,
  matchBrackets: true,
  cursorScrollMargin: 48,
  mode: "text/x-java",
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99
};

export class Editors extends React.Component {
  state = {
    cppValue: DEFAULT_CPP_VALUE || this.props.cppValue,
    pyValue: DEFAULT_PY_VALUE || this.props.pyValue,
    javaValue: DEFAULT_JAVA_VALUE || this.props.javaValue,
  };
  
  cppOptions = {
    ...DEFAULT_CPP_OPTIONS,
    ...this.props.cppOptions
  };

  pyOptions = {
    ...DEFAULT_PY_OPTIONS,
    ...this.props.pyOptions
  };

  javaOptions = {
    ...DEFAULT_JAVA_OPTIONS,
    ...this.props.javaOptions
  };

  onChange = which => (editor, data, value) => {
    this.setState({ [`${which}Value`]: value });
  };
  
  render() {
    return (
      <React.Fragment>
        <PureEditor
          name="cpp"
          value={this.state.cppValue}
          options={this.cppOptions}
          onChange={this.onChange("cpp")}
        />
        <PureEditor
          name="java"
          value={this.state.javaValue}
          options={this.javaOptions}
          onChange={this.onChange("java")}
        />
        <PureEditor
          name="python"
          value={this.state.pyValue}
          options={this.pyOptions}
          onChange={this.onChange("python")}
        />
      </React.Fragment>
    );
  }
}
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
