import { writeStorage } from "@rehooks/local-storage";
import axios from "axios";
import { LOCAL_STORAGE_KEY } from "./constants";
import * as localStorage from "local-storage";
import { format } from "date-fns";

export default class APIClient {
  static async getFoodEntryGroups({ startDate, endDate }: { startDate?: Date, endDate?: Date }) {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    let params = {}
    if (startDate && endDate) {
      params = {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd')
      }
    }

    const res = await axios({
      method: "get",
      url: "/api/food-entry-groups",
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getCurrentUser() {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await axios({
      method: "get",
      url: "/api/auth/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await axios({
      method: "post",
      url: "/api/food-entries",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async deleteFoodEntry(id) {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await axios({
      method: "delete",
      url: `/api/food-entries/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}
