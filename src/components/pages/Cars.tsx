import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as Middleware from "../../middlewares";
import Menu from "../menu";

interface PropsInterface {
  location: any;
  Store: any;
  Dispatch: any;
  history: any;
}

interface StateInterface {
  selectedBrand: number | null;
  selectedModel: number | null;
  selectedGeneration: number | null;
  title: string;
  footerText: string;
}

class carsPage extends React.Component<PropsInterface, StateInterface> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      selectedBrand: null,
      selectedModel: null,
      selectedGeneration: null,
      title: "Brands",
      footerText: "",
    };
  }

  public componentDidMount() {
    if (this.props.Store.Car.brands.length === 0) {
      this.props.Dispatch(Middleware.Car.getBrands(1));
    }
  }

  public render() {
    return (
      <>
        <Menu Title={this.state.title} />
        <div className="page">
          <div className="list-containter">
            {/* Бренды */}
            {this.state.selectedBrand === null ? (
              <>
                {this.props.Store.Car.brands.map(
                  (Brand: any, index: number) => {
                    return (
                      <div
                        className="item-card"
                        key={index}
                        onClick={() => {
                          this.props.Dispatch(
                            Middleware.Car.getModels({
                              city_id: 1,
                              brand_id: Brand.id,
                            })
                          );

                          this.setState({
                            selectedBrand: Brand.id,
                            title: "Models",
                            footerText: this.state.footerText + Brand.name,
                          });
                        }}
                      >
                        <img className="item-img" src={Brand.preview} alt="" />
                        <p className="item-name">{Brand.name}</p>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <>
                {this.props.Store.Car.models.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {/* Модели */}
            {this.state.selectedModel === null ? (
              <>
                {this.props.Store.Car.models.map(
                  (Model: any, index: number) => {
                    return (
                      <div
                        className="item-card"
                        key={index}
                        onClick={() => {
                          this.props.Dispatch(
                            Middleware.Car.getGenerations({
                              city_id: 1,
                              brand_id: this.state.selectedBrand,
                              model_id: Model.id,
                            })
                          );

                          this.setState({
                            selectedModel: Model.id,
                            title: "Generation",
                            footerText: this.state.footerText + " " + Model.name,
                          });
                        }}
                      >
                        <p className="item-name">{Model.name}</p>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <>
                {this.props.Store.Car.generations.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {/* Генерации */}
            {this.state.selectedGeneration === null ? (
              <>
                {this.props.Store.Car.generations.map(
                  (Generation: any, index: number) => {
                    return (
                      <div
                        className="card card__generation"
                        key={index}
                        onClick={() => {
                          this.props.Dispatch(
                            Middleware.Car.addCar(Generation)
                          );
                          this.props.history.push("/");
                        }}
                      >
                        <img
                          src={Generation.preview}
                          className="card-img"
                          alt="..."
                        />
                        <div className="card-img-overlay">
                          <div className="card-title">{Generation.name}111</div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <>
                {this.props.Store.Car.generations.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {this.state.footerText ? (
            <div className="footer">{this.state.footerText}</div>
          ) : (
            <></>
          )}
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
  )(carsPage)
);
