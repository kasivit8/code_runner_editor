import React from "react";
import './App.css';

import ReactMarkdown from "react-markdown";
import "antd/dist/antd.css";
import { Collapse } from 'antd';

import { Editors } from './Editor';

const { Panel } = Collapse;

function App() {

  const markdown = `
  This lab is to create a list of catalog items and sort it. The item may be a 'Book' or a 'CD'. Both 'Book' and 'CD' will therefore be classes implementing an interface called 'Media'. Since the catalog item can be a 'Book' or a 'CD', we will make a generic class called 'CatalogItem' which can take one of these two types.
  The details are as follows:
  -	Each Book and a CD has its own unique ID. The difference between the CD class and the Book class will be in the data types for the ID, since a CD usually has an integer code as its ID and a book uses an alphanumeric string code (ISBN). These ID's will be the basis of the sorting which this lab aims to accomplish.
  - As CatalogItem is a generic class with a single parameter, and we can create a CatalogITem of type book or a CD.
  - A catalog will be represented as an ArrayList of CatalogItems.
  - CatalogItem will be Comparable itself, as we wish to call 'sort' on a list of CatalogItems, which in turn calls the compareTo() method to do the sorting.
  ***
  ## Question 1
  Create Media.java: An interface with four methods that every class considered to be some form of media should be able to define.  
  public <T> Comparable<T> getId(): Returns a generic type Id which will be an Integer or a String based on whether a Book implements Media or a CD.  
  getCreator(): Returns a String and has no arguments. Its return value should be the name of the person responsible for creating this Media.  
  getTitle(): Returns a String and has no arguments. Its return value should be the title of this Media.  
  getYear(): Returns an int and has no arguments. Its return value should be the year that this Media was created.

  ***
  `;
  return (
    <div className="App">
      <h1>AOOPLab7</h1>
      <Collapse defaultActiveKey={['Markdown','Code']}>
        <Panel header="Markdown" key="Markdown" style={{textAlign:"left"}}>
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
