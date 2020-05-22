import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  Title: string;
}

interface StateInterface {
  UIshowMenu: boolean;
}

class Menu extends React.Component<PropsInterface, StateInterface> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      UIshowMenu: false,
    };
  }

  public componentDidMount() {}

  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {this.props.Title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            this.setState({
              UIshowMenu: !this.state.UIshowMenu,
            });
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            "navbar-collapse " + (this.state.UIshowMenu ? "" : "collapse")
          }
        >
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link" href="#">
              Home
            </Link>
            <Link to="/cars" className="nav-item nav-link" href="#">
              Cars
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect(
    (Store: any) => {
      return { Store };
    },
    (Dispatch: any) => {
      return { Dispatch: (action: any) => Dispatch(action) };
    }
  )(Menu)
);
