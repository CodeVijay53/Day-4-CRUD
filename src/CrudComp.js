import React from "react";
import axios from "axios";

export default class CrudComp extends React.Component {
  constructor() {
    super();
    this.state = {
      empdatum: [],
      Id: "",
      Name: "",
      Age: "",
      Place: "",
    };
  }
  async componentDidMount() {
    var response = await axios.get(
      "https://63bab60232d17a50907b3885.mockapi.io/empdata"
    );

    await this.setState({ empdatum: response.data });
  }
  render() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (this.state.Id) {
        var response = await axios.put(
          `https://63bab60232d17a50907b3885.mockapi.io/empdata/${this.state.Id}`,
          {
            Name: this.state.Name,
            Age: this.state.Age,
            Place: this.state.Place,
          }
        );
        var index = this.state.empdatum.findIndex(
          (row) => row.Id === response.data.Id
        );
        var empdatum = [...this.state.empdatum];
        empdatum[index] = response.data;
        this.setState({ empdatum, Name: "", Age: "", Place: "", Id: "" });
      } else {
        var response = await axios.post(
          "https://63bab60232d17a50907b3885.mockapi.io/empdata",
          {
            Name: this.state.Name,
            Age: this.state.Age,
            Place: this.state.Place,
            Id: this.state.Id,
          }
        );
        var empdatum = [...this.state.empdatum];
        empdatum.push(response.data);
        this.setState({ empdatum, Name: "", Age: "", Place: "", Id: "" });
      }
    };
    const onPopulateData = (Id) => {
      const selectedData = this.state.empdatum.filter(
        (row) => row.Id === Id
      )[0];
      this.setState({
        Name: selectedData.Name,
        Age: selectedData.Age,
        Place: selectedData.Place,
        Id: selectedData.Id,
      });
    };
    const deleteData = async (Id) => {
      const response = await axios.delete(
        `https://63bab60232d17a50907b3885.mockapi.io/empdata/${Id}`
      );
      var empdatum = this.state.empdatum.filter((row) => row.Id !== Id);
      this.setState({ empdatum });
    };
    return (
      <>
        <h3>Crud Component</h3>
        <h3>User Form</h3>
        <form
          className="formclass"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={this.state.Name}
              onChange={(e) => this.setState({ Name: e.target.value })}
            ></input>
          </div>
          &nbsp;&nbsp;
          <div>
            <label>Age: </label>
            <input
              type="text"
              value={this.state.Age}
              onChange={(e) => this.setState({ Age: e.target.value })}
            ></input>
          </div>
          &nbsp;&nbsp;
          <div>
            <label>Place: </label>
            <input
              type="text"
              value={this.state.Place}
              onChange={(e) => this.setState({ Place: e.target.value })}
            ></input>
          </div>
          &nbsp;&nbsp;
          <button type="submit">Submit</button>&nbsp;&nbsp;
          <button type="button">Reset</button>
        </form>
        <br />
        <br />
        <div className="tableclass">
          <table border="1" cellspacing="5px">
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Age</td>
                <td>Place</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.state.empdatum.map((row) => (
                <tr>
                  <td>{row.Id}</td>
                  <td>{row.Name}</td>
                  <td>{row.Age}</td>
                  <td>{row.Place}</td>
                  <td>
                    <button
                      onClick={() => {
                        onPopulateData(row.Id);
                      }}
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      onClick={() => {
                        deleteData(row.Id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="container-flex">
          <div className="copyright">
            <p>All rights reserved &copy;</p>
            <p>Made with 💙 by Vijay Shankar</p>
          </div>
        </footer>
      </>
    );
  }
}
