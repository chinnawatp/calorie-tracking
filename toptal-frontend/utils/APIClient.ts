import axios, { Method } from "axios";
import { LOCAL_STORAGE_KEY } from "./constants";
import * as localStorage from "local-storage";
import { format } from "date-fns";

async function fetchAxios({
  method,
  url,
  params,
  data,
}: {
  method: Method;
  url: string;
  params?: any;
  data?: any;
}): Promise<any> {
  const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

  try {
    const res = await axios({
      method,
      url: `/api/${url}`,
      params,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export default class APIClient {
  static async getFoodEntryGroups({
    startDate,
    endDate,
  }: {
    startDate?: Date;
    endDate?: Date;
  }) {
    let params = {};
    if (startDate && endDate) {
      params = {
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
    }

    const res = await fetchAxios({
      method: "get",
      url: "food-entry-groups",
      params,
    });

    return res;
  }

  static async getCurrentUser() {
    const res = await fetchAxios({
      method: "get",
      url: "/auth/profile",
    });

    return res;
  }

  static async login(data: { email: string; password: string }) {
    const res = await fetchAxios({
      method: "post",
      url: "/auth/login",
      data,
    });

    const { accessToken } = res;
    localStorage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  }

  static async createFoodEntry(data: any) {
    const res = await fetchAxios({
      method: "post",
      url: "/food-entries",
      data,
    });
    return res;
  }

  static async deleteFoodEntry(id: number) {
    const token = localStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetchAxios({
      method: "delete",
      url: `/food-entries/${id}`,
    });
    return res;
  }

  static async getAdminReport() {
    const res = await fetchAxios({
      method: "get",
      url: `/admin/report`,
    });
    return res;
  }
}
