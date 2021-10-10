import { writeStorage } from "@rehooks/local-storage";
import axios from "axios";
import { LOCAL_STORAGE_KEY } from "./constants";
import * as localStorage from "local-storage";

export default class APIClient {
  static async getFoodEntryGroups() {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    const res = await axios({
      method: "get",
      url: "/api/food-entry-groups",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return res.data;
  }

  static async login(data: { email: string; password: string }) {
    const res = await axios({
      method: "post",
      url: "/api/auth/login",
      data,
    });

    const { accessToken } = res.data;
    localStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  }

  static async createFoodEntry(data) {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    const res = await axios({
      method: "post",
      url: "/api/food-entries",
      data,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return res.data
  }

  static async deleteFoodEntry(id) {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    const res = await axios({
      method: "delete",
      url: `/api/food-entries/${id}`,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return res.data
  }
}
