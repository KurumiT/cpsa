import ModelPrototype, { Method } from "./ModelPrototype";

export default class Client extends ModelPrototype {
  public async load(data: any): Promise<any[]> {
    try {
      return this.withUrl("client")
        .setMethod(Method.GET)
        .request(data);
    } catch (Exception) {
      throw Exception;
    }
  }
}
