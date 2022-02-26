import axios, { AxiosResponse } from "axios";

class HereMapsGeocodingLocationService {
  private static baseUrl = "https://discover.search.hereapi.com/v1/";

  public static async findGeocodingLocation(typedLocation: string) {
    try {
      const url = `geocode?q=${typedLocation}&apiKey=${process.env["HERE_MAPS_LOCATION_SERVICES_REST_API_KEY"]}`;

      const response: AxiosResponse | void = await axios({
        baseURL: this.baseUrl,
        url: url,
        method: "GET",
      })
        .then((res) => res)
        .catch((err) => console.error("### Response Error ###", err.message));

      return response && response?.data;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { HereMapsGeocodingLocationService };
