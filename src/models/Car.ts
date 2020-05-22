import ModelPrototype, { Method } from "./ModelPrototype";

export default class Car extends ModelPrototype {
  public async getBrands(data: any): Promise<any[]> {
    try {
      return this.withUrl("brands/" + data)
        .setMethod(Method.GET)
        .baseUrl("https://calc.synergy.group/")
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
  public async getModels(data: any): Promise<any[]> {
    try {
      return this.withUrl("models/" + data.city_id + "/" + data.brand_id)
        .setMethod(Method.GET)
        .baseUrl("https://calc.synergy.group/")
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }
  public async getGenerations(data: any): Promise<any[]> {
    try {
      return this.withUrl("generations/" + data.city_id + "/" + data.brand_id + "/" + data.model_id)
        .setMethod(Method.GET)
        .baseUrl("https://calc.synergy.group/")
        .request();
    } catch (Exception) {
      throw Exception;
    }
  }
}
