export default class Car {
  public static readonly SET_LOADING_STATUS = "CAR_SET_LOADING_STATUS";
  public static readonly SET_ERROR = "CAR_SET_ERROR";
  public static readonly SET_LIST = "CAR_SET_LIST";
  public static readonly ADD_TO_LIST = "CAR_ADD_TO_LIST";
  public static readonly SET_BRANDS = "CAR_SET_BRANDS";
  public static readonly SET_MODELS = "CAR_SET_MODELS";
  public static readonly SET_GENERATIONS = "CAR_SET_GENERATIONS";
  public static readonly SET_DESCRIPTION = "CAR_SET_DESCRIPTION";
  public static readonly CLEAR = "CAR_CLEAR";

  public static setLoadingStatus(data: any) {
    return {
      data,
      type: Car.SET_LOADING_STATUS,
    };
  }
  public static setError(data: any) {
    return {
      data,
      type: Car.SET_ERROR,
    };
  }
  public static setList(data: any) {
    return {
      data,
      type: Car.SET_LIST,
    };
  }
  public static addCar(data: any) {
    return {
      data,
      type: Car.ADD_TO_LIST,
    };
  }
  public static setBrands(data: any) {
    return {
      data,
      type: Car.SET_BRANDS,
    };
  }
  public static setModels(data: any) {
    return {
      data,
      type: Car.SET_MODELS,
    };
  }
  public static setGenerations(data: any) {
    return {
      data,
      type: Car.SET_GENERATIONS,
    };
  }
  public static setDescription(data: any) {
    return {
      data,
      type: Car.SET_DESCRIPTION,
    };
  }
  public static Clear(data: any) {
    return {
      data,
      type: Car.CLEAR,
    };
  }
}
