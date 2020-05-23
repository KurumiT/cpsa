import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AsyncStorage from "@react-native-community/async-storage";
import Menu from "../menu";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
}

interface StateInterface {
  showCar: number | null;
}

class homeListPage extends React.Component<PropsInterface, StateInterface> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      showCar: null,
    };
  }

  public componentDidMount() {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("generation");
        if (value !== null) {
          // value previously stored
          console.log(value);
        }
      } catch (e) {
        // error reading value
      }
    };
  }

  public render() {
    return (
      <>
        <Menu title="Отслеживание" />
        <div className="page">
          {this.props.Store.Car.list.length > 0 ? (
            <>
              {this.props.Store.Car.list.map((Car: any, index: number) => {
                return (
                  <div key={index} className="card card__car">
                    <img src={Car.preview} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{Car.name}</h5>

                      <a href="#" className="btn btn-primary btn-block">
                        Статистика
                      </a>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <h3>Вы пока не добавили машины</h3>
          )}
          <div className="card card__car">
            <div className="card-body">
              <Link to="/cars" className="btn btn-warning btn-lg btn-block">
                +
              </Link>
            </div>
          </div>
        </div>
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
  )(homeListPage)
);
