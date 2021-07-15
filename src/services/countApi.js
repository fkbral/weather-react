import axios from "axios";

export const countApi = axios.create({
  baseURL: "https://count-api-fake"
})