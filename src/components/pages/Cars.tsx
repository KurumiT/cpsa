import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as Middleware from "../../middlewares";
import Menu from "../menu";
import { Line } from "react-chartjs-2";
import * as StringFormatter from "../../utils/StringFormatter";
import AsyncStorage from "@react-native-community/async-storage";

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
  brandImage: string;
  brandName: string;
  modelName: string;
  generationName: string;
  showFooter: boolean;
  showCustomTitle: boolean;
  day: any;
  week: any;
  month: any;
  dayLabel: any;
  weekLabel: any;
  monthLabel: any;
}

class carsPage extends React.Component<PropsInterface, StateInterface> {
  constructor(Props: PropsInterface) {
    super(Props);
    this.state = {
      selectedBrand: null,
      selectedModel: null,
      selectedGeneration: null,
      title: "Брэнды",
      brandImage: "",
      brandName: "",
      modelName: "",
      generationName: "",
      showFooter: true,
      showCustomTitle: false,
      day: [],
      week: [],
      month: [],
      dayLabel: [],
      weekLabel: [],
      monthLabel: [],
    };
  }

  public componentDidMount() {
    if (this.props.Store.Car.brands.length === 0) {
      this.props.Dispatch(Middleware.Car.getBrands(1));
    }
  }

  dayFormatter(unix: number) {
    var a = new Date(unix * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + " " + month + " " + year;
    return time;
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps !== this.props) {
      if (this.props.Store.Car.description !== undefined) {
        const days = this.props.Store.Car.description.historical.day.slice(
          0,
          30
        );
        const dayLabel: any = [];
        const formatDays: any = [];
        days.map((day: any) => {
          formatDays.push({
            x: day[0],
            y: day[1],
          });
          // dayLabel.push(this.dayFormatter(day[0]));
          dayLabel.push(new Date(day[0] * 1000).getDate());
        });
        const weeks = this.props.Store.Car.description.historical.week;
        const weekLabel: any = [];
        const formatWeeks: any = [];
        weeks.map((week: any) => {
          formatWeeks.push({ x: week[0], y: week[1] });
          weekLabel.push(this.dayFormatter(week[0]));
        });
        const months = this.props.Store.Car.description.historical.month;
        const monthLabel: any = [];
        let formatMonths: any = [];
        months.map((month: any) => {
          formatMonths.push({ x: month[0], y: month[1] });
          monthLabel.push(this.dayFormatter(month[0]));
        });
        this.setState({
          day: formatDays,
          week: formatWeeks,
          month: formatMonths,
          dayLabel: dayLabel,
          weekLabel: weekLabel,
          monthLabel: monthLabel,
        });
      }
    }
  }

  public render() {
    return (
      <>
        <Menu
          title={this.state.title}
          brandName={this.state.brandName}
          brandImage={this.state.brandImage}
          modelName={this.state.modelName}
          generationName={this.state.generationName}
          showCustomTitle={this.state.showCustomTitle}
        />
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
                            title: "Модели",
                            brandImage: Brand.preview,
                            brandName: Brand.name,
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
                            title: "Поколения",
                            modelName: Model.name,
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
                          this.props.Dispatch(
                            Middleware.Car.getDescription({
                              generation_id: Generation.id,
                            })
                          );
                          const storeData = async (generation_id: string) => {
                            try {
                              await AsyncStorage.setItem(
                                "generation",
                                generation_id
                              );
                            } catch (e) {
                              // saving error
                            }
                          };
                          this.setState({
                            selectedGeneration: Generation.id,
                            generationName: Generation.name,
                            showFooter: false,
                            showCustomTitle: true,
                          });
                        }}
                      >
                        <img
                          src={Generation.preview}
                          className="card-img"
                          alt="..."
                        />
                        <div className="card-img-overlay">
                          <div className="card-title">{Generation.name}</div>
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
                  <>
                    {this.props.Store.Car.description !== undefined ? (
                      <>
                        <p>
                          Диапазон цен{" "}
                          {StringFormatter.numberWithCommas(
                            this.props.Store.Car.description.min_price
                          )}{" "}
                          -{" "}
                          {StringFormatter.numberWithCommas(
                            this.props.Store.Car.description.max_price
                          )}{" "}
                          рублей
                        </p>
                        {this.props.Store.Car.description.auto ? (
                          <p>
                            Средняя цена автомат.:{" "}
                            {StringFormatter.numberWithCommas(
                              Math.ceil(this.props.Store.Car.description.auto)
                            )}{" "}
                            рублей.
                          </p>
                        ) : (
                          <></>
                        )}
                        {this.props.Store.Car.description.mechanical ? (
                          <p>
                            Средняя цена механика.:{" "}
                            {StringFormatter.numberWithCommas(
                              Math.ceil(
                                this.props.Store.Car.description.mechanical
                              )
                            )}{" "}
                            рублей.
                          </p>
                        ) : (
                          <></>
                        )}
                        <Line
                          data={{
                            labels: this.state.dayLabel,
                            datasets: [
                              {
                                label: "days",
                                lineTension: 0.1,
                                fill: false,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: this.state.day,
                              },
                            ],
                          }}
                        />
                        <Line
                          data={{
                            labels: this.state.weekLabel,

                            datasets: [
                              {
                                label: "week",
                                lineTension: 0.1,
                                fill: false,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: this.state.week,
                              },
                            ],
                            options: {
                              scales: {
                                xAxes: [
                                  {
                                    type: "linear",
                                  },
                                ],
                              },
                            },
                          }}
                        />
                        <Line
                          data={{
                            labels: this.state.monthLabel,
                            datasets: [
                              {
                                label: "month",
                                lineTension: 0.1,
                                fill: false,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: this.state.month,
                              },
                            ],
                            options: {
                              scales: {
                                xAxes: [
                                  {
                                    type: "linear",
                                  },
                                ],
                              },
                            },
                          }}
                        />
                      </>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {this.state.brandName && this.state.showFooter ? (
            <div className="footer">
              <img className="footer-img" src={this.state.brandImage} alt="" />
              {this.state.brandName}{" "}
              {this.state.modelName + " " + this.state.generationName}
            </div>
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
