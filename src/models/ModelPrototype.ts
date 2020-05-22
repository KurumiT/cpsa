import axios, { AxiosResponse } from "axios";

export enum Method {
  GET = 0,
  POST,
  PUT,
  DELETE,
}

export default abstract class ModelPrototype {
  protected Method: Method = 0;
  protected Url: string = "";
  protected BaseUrl: string = "";
  protected authToken: string | null = null;

  public constructor(BaseUrl?: string) {
    if (BaseUrl === undefined) {
      this.BaseUrl = process.env.API_URL || "";
    }
  }
  protected async request(data?: any): Promise<any> {
    try {
      const url = new URL(this.BaseUrl + this.Url);
      let Response: any;
      switch (this.Method) {
        case Method.GET:
          if (typeof data === "object") {
            const keys = Object.keys(data);
            keys.forEach((key: any) => {
              const value = data[key];
              if (value !== null) {
                url.searchParams.set(key, value);
              }
            });
          }
          Response = await axios.get(url.toString(), {
            headers: {
              Accept: "application/json",
              Authorization:
                this.authToken !== null ? "Bearer " + this.authToken : "",
            },
          });
          break;
        case Method.POST:
          if (typeof data === "object") {
            const form_data = new FormData();
            for (const key in data) {
              if (
                data.hasOwnProperty(key) &&
                key !== "Authorization" &&
                key !== "id"
              ) {
                form_data.append(key, data[key]);
              }
            }
            data = form_data;
          }
          Response = await axios.post(url.toString(), data ? data : {}, {
            headers: {
              Accept: "application/json",
              Authorization:
                this.authToken !== null ? "Bearer " + this.authToken : "",
            },
          });
          break;
        case Method.PUT:
          Response = await axios.put(url.toString(), data ? data : {}, {
            headers: {
              Accept: "application/json",
              Authorization:
                this.authToken !== null ? "Bearer " + this.authToken : "",
            },
          });
          break;
        case Method.DELETE:
          Response = await axios.delete(url.toString(), {
            headers: {
              Accept: "application/json",
              Authorization:
                this.authToken !== null ? "Bearer " + this.authToken : "",
            },
          });
          break;
      }

      if (
        Response.data.status === "error" &&
        Response.data.error === "Not authorized."
      ) {
        document.cookie = "auth.token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.reload();
      }

      return Response.data;
    } catch (Exception) {
      throw Exception.response.data.error;
    }
  }

  protected withUrl(Url: string) {
    this.Url = Url;
    return this;
  }

  protected baseUrl(Url: any) {
    this.BaseUrl = Url;
    return this;
  }

  protected withAuth(token: string) {
    this.authToken = token;
    return this;
  }

  protected setMethod(Method: Method) {
    this.Method = Method;
    return this;
  }
}
