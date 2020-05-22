import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PropsInterface extends RouteProps {
  validator?: any | any[];
  Store: any;
  Dispatch: any;
}

export default connect(
  (Store: any) => {
    return { Store };
  },
  (Dispatch: any) => {
    return { Dispatch: (action: any) => Dispatch(action) };
  }
)(
  class Router extends Route<PropsInterface> {
    private initRoute() {
      return <Route {...this.props} />;
    }

    private redirectTo(path: string) {
      return (
        <Route {...this.props}>
          <Redirect to={{ pathname: path }} />
        </Route>
      );
    }

    private validate(Validator: any): any {
      return new Validator(this.props.Store).validate();
    }

    public render() {
      if (this.props.validator !== undefined) {
        if (Array.isArray(this.props.validator) === true) {
          let redirect: any;
          redirect = null;
          for (const Validator of this.props.validator) {
            const Response = this.validate(Validator);
            if (Response.isValid === false) {
              return this.redirectTo(Response.redirectPath);
            }
          }
        } else {
          const Response = this.validate(this.props.validator);
          if (Response.isValid === false) {
            return this.redirectTo(Response.redirectPath);
          }
        }
      }

      return this.initRoute();
    }
  }
);
