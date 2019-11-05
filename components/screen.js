import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnA: null,
      columnB: null,
      types: null, //this contains what type of fields are the columns
      dropdowns: null //this contains values for the dropdowns if any
    };
  }

  //data fetch for prepopulating column A fields with values and column B fileds without values/null values

  componentDidMount() {
    const screenNumber = this.props.match.params.screenId;
    axios
      .get("./data.json")
      .then(res => {
        if (screenNumber === "1") {
          const columnB = {};
          //to copy the fields names only to column B
          Object.keys(res.data.screen1).forEach(key => {
            columnB[key] = null;
          });
          const newState = {
            columnA: res.data.screen1,
            columnB: columnB,
            types: res.data.types,
            dropdowns: res.data.dropdowns
          };
          this.setState(newState);
        } else {
          const columnB = {};
          //to copy the fields names only to column B
          Object.keys(res.data.screen2).forEach(key => {
            columnB[key] = null;
          });
          const newState = {
            columnA: res.data.screen2,
            columnB: columnB,
            types: res.data.types,
            dropdowns: res.data.dropdowns
          };
          this.setState(newState);
        }
      })
      .catch(err => {
        console.log("Error in fetching data");
      });
  }
  //   handle change function for Column A
  // if any changes it will be stored back in state of columnA itself
  // it is generic handle function for all the field changes
  onHandleChangeColumnA = event => {
    const newColumnA = {
      ...this.state.columnA,
      [event.target.name]: event.target.value
    };
    const newState = { ...this.state, columnA: newColumnA };
    this.setState(newState);
  };

  //handle change function for Column B
  //if any changes it will be store back in state of columnA itself
  //if clicked again on copy ,state is copied from column A to column B with either initial data or if any changes in column A the respected changes are copied
  onHandleChangeColumnB = event => {
    const newColumnB = {
      ...this.state.columnB,
      [event.target.name]: event.target.value
    };
    const newState = { ...this.state, columnB: newColumnB };
    this.setState(newState);
  };

  //generic function that copies the column A field values  to repective fields of Column B
  onCopy = () => {
    const columnB = { ...this.state.columnA };
    const newState = { ...this.state, columnB: columnB };
    this.setState(newState);
  };

  //returns tr with particular type of inputs for column A and Column B
  //initially only Column A values are populated
  //on clicking copy Column B values are also filled with values from column A
  getFieldJsx = fieldName => {
    const type = this.state.types[fieldName].uiType;
    switch (type) {
      case "textInput":
        return (
          <tr key={fieldName}>
            <td>
              <input
                type="text"
                value={this.state.columnA[fieldName]}
                name={fieldName}
                onChange={this.onHandleChangeColumnA}
              />
            </td>
            <td>
              <input
                type="text"
                value={this.state.columnB[fieldName]}
                name={fieldName}
                onChange={this.onHandleChangeColumnB}
              />
            </td>
          </tr>
        );
      case "number":
        return (
          <tr key={fieldName}>
            <td>
              <input
                type="number"
                name={fieldName}
                value={this.state.columnA[fieldName]}
                onChange={this.onHandleChangeColumnA}
              />
            </td>
            <td>
              <input
                name={fieldName}
                type="number"
                value={this.state.columnB[fieldName]}
                onChange={this.onHandleChangeColumnB}
              />
            </td>
          </tr>
        );
      case "date":
        //date format 'YYYY-MM-DD'
        return (
          <tr key={fieldName}>
            <td>
              <input
                type="date"
                name={fieldName}
                value={this.state.columnA[fieldName]}
                onChange={this.onHandleChangeColumnA}
              />
            </td>
            <td>
              <input
                name={fieldName}
                onChange={this.onHandleChangeColumnB}
                type="date"
                value={this.state.columnB[fieldName]}
              />
            </td>
          </tr>
        );
      case "textArea":
        return (
          <tr key={fieldName}>
            <td>
              <textarea
                name={fieldName}
                value={this.state.columnA[fieldName]}
                onChange={this.onHandleChangeColumnA}
              />
            </td>
            <td>
              <textarea
                name={fieldName}
                value={this.state.columnB[fieldName]}
                onChange={this.onHandleChangeColumnB}
              />
            </td>
          </tr>
        );
      case "dropdown":
        const options = this.state.dropdowns[fieldName].slice().map(val => {
          return <option>{val}</option>;
        });
        return (
          <tr key={fieldName}>
            <td>
              <select
                name={fieldName}
                value={this.state.columnA[fieldName]}
                onChange={this.onHandleChangeColumnA}
              >
                <option value="">Select</option>
                {options}
              </select>
            </td>
            <td>
              <select
                name={fieldName}
                value={this.state.columnB[fieldName]}
                onChange={this.onHandleChangeColumnB}
              >
                <option value="">Select</option>
                {options}
              </select>
            </td>
          </tr>
        );
      default:
        return null;
    }
  };

  render() {
    let tableBodyContent;
    if (this.state.columnA && this.state.columnB) {
      tableBodyContent  = Object.keys(this.state.columnA).map(key => {
        return this.getFieldJsx(key);
      });
    }
    return (
      <>
        {this.state.columnA && this.state.columnB ? (
          <div>
            <div>
              <Link to="/">{"<<<Back to Screens"}</Link>
            </div>
            <div className="table-responsive">
              <table
                style={{ margin: "auto" }}
                className="table table-bordered table-primary w-50 text-center"
              >
                <thead>
                  <tr>
                    <th>Column A</th>
                    <th>Column B</th>
                  </tr>
                </thead>
                <tbody>{tableBodyContent}</tbody>
              </table>
            </div>

            <button
              style={{ margin: "5px auto", width: "50%" }}
              className="btn btn-primary  btn-block"
              onClick={this.onCopy}
              title="Copy values from Column A to Column B"
            >
              Populate =>
            </button>
          </div>
        ) : null}
      </>
    );
  }
}
export default Screen;
