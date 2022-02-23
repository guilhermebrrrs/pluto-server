import { GraphHopperGeocodingRequestSchema } from "../types";
import axios from "axios";

class GraphHopperGeocodingLocationService {
  public static async findGeocodingLocation(typedLocation: string) {
    try {
      const url = `https://graphhopper.com/api/1/geocode?q=${typedLocation}&locale=br&debug=true&key=${process.env["GRAPH_HOPPER_API_KEY"]}`;

      return (await axios
        .get(url)
        .then((res) => res?.data)) as GraphHopperGeocodingRequestSchema;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { GraphHopperGeocodingLocationService };
