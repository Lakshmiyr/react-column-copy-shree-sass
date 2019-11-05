import React, { Component } from "react";
import { Link } from "react-router-dom";
import './scss/screenList.scss';

class ScreenList extends Component {
  render() {
    return (
      <>
        <div className="jumbotron text-center">
          <h3 className="">Column Copy React POC</h3>

          <ul className="list-group w-50" style={{ margin: "auto" }}>
            <li className="list-group-item">
              <Link to={"/screens/1"}>Screen 1</Link>
            </li>
            <li className="list-group-item">
              <Link to={"/screens/2"}>Screen 2</Link>
            </li>
          </ul>

          <hr className="my-4" />

          <p>
            Initial Data fetched from data.json <br />
            Prepopulated values in column A and copied values from Column A to
            Column B
          </p>
        </div>
      </>
    );
  }
}
export default ScreenList;
