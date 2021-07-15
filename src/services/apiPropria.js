import axios from "axios";

export const apiPropria = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Authorization": "Bearer token_da_aplicacao"
  }
})