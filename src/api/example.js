import axios from "util/axios"

const baseURL = "/example"
export function radioGroup(query) {
  return axios({ url: baseURL + "/radioGroup", method: "get", params: query })
}

export function cascader(query) {
  return axios({ url: baseURL + "/cascader", method: "get", params: query })
}

export function formApi(query) {
  return axios({ url: baseURL + "/form", method: "post", data: query })
}
