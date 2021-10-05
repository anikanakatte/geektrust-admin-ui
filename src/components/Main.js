import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TableView from "./Table/TableView";

import {
  apiEndpoint,
  PAGELIMIT,
  DATALIMIT,
  DEBOUNCE_TIMEOUT,
} from "../constants";
import "./Main.css";
import Paginate from "./Paginate";
export default class Main extends Component {
  constructor() {
    super();
    this.totalData = [];
    this.debounceTimeout = "";
    this.state = {
      loading: false,
      data: [],
    };
  }

  search = (text) => {
    if (text === "") {
      this.setState({ data: [...this.totalData] });
    } else {
      this.setState((state) => {
        return {
          data: this.state.data.filter(
            (el) =>
              el.name.toLowerCase().includes(text.toLowerCase()) ||
              el.email.toLowerCase().includes(text.toLowerCase()) ||
              el.role.toLowerCase().includes(text.toLowerCase())
          ),
        };
      });
    }
  };

  debounceSearch = (event) => {
    let txt = event.target.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(
      function () {
        this.search(txt);
      }.bind(this),
      DEBOUNCE_TIMEOUT
    );
  };

  deleteUser = (id) => {
    this.totalData = this.totalData.filter((el) => el.id !== id);
    this.setState({ data: [...this.state.data.filter((el) => el.id !== id)] });
  };

  multiDelete = (id) => {
    this.setState({
      data: [...this.state.data.filter((el) => id.indexOf(el.id) < 0)],
    });
    this.totalData = this.totalData.filter((el) => id.indexOf(el.id) < 0);
  };

  callAPI = async () => {
    let res = [];
    try {
      res = await (await fetch(apiEndpoint.URL)).json();
    } catch (err) {
      console.log(err);
    } finally {
      return res;
    }
  };

  async componentDidMount() {
    let res;
    try {
      res = await this.callAPI();
    } catch (err) {
      alert("coulnt fetch users");
      console.log(err);
    }

    if (res && res.length > 0) {
      this.setState({ data: [...res] });
      this.totalData = [...res];
    }
  }

  render() {
    return (
      <Container>
        <div className="search-bar-container">
          <input
            id="search-bar"
            type="text"
            onChange={(e) => {
              this.debounceSearch(e);
            }}
            placeholder="Search for users by name, email or role"
          />
        </div>

        {this.state.data.length > 0 ? (
          <Paginate
            data={this.state.data}
            pageLimit={PAGELIMIT}
            dataLimit={DATALIMIT}
            onDelete={this.deleteUser}
            onMultiDelete={this.multiDelete}
            RenderComponent={TableView}
          />
        ) : (
          <div>No data to display</div>
        )}
      </Container>
    );
  }
}
