import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import * as Component from "../components";
import Router, { Validator } from "../utils/router";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  isChecked: boolean;
}
class Page extends React.Component<PropsInterface, StateInterface> {
  public constructor(props: PropsInterface) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  public componentDidMount() {
    this.setState({ isChecked: true });
  }

  public render() {
    return (
      <>
        {this.state.isChecked !== false ? (
          <>
            <main className="main">
              <Switch>
                <Router
                  path="/"
                  exact={true}
                  component={Component.Page.homeListPage}
                />
                <Router path="/cars" component={Component.Page.carsPage} />
                <Router path="/graph/:id" component={Component.Page.graphPage} />
              </Switch>
              {/* End Programs */}
            </main>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>
        )}
      </>
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
  )(Page)
);
