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
    throw new Error(error.response?.data?.message || "Internal Server Error");
  }
}

export default class APIClient {
  static async getFoodEntryGroups({
    startDate,
    endDate,
    page,
  }: {
    startDate: string | null;
    endDate: string | null;
    page?: number;
  }) {
    let params: {
      page?: number;
      startDate?: string;
      endDate?: string;
    } = {
      page,
    };
    if (startDate && endDate) {
      params.startDate = format(new Date(startDate), "yyyy-MM-dd");
      params.endDate = format(new Date(endDate), "yyyy-MM-dd");
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

  static async getAdminFoodEntries({ page }: { page?: number } = {}) {
    const res = await fetchAxios({
      method: "get",
      url: `/admin/food-entries`,
      params: { page },
    });
    return res;
  }

  static async adminCreateFoodEntry(data: any) {
    const res = await fetchAxios({
      method: "post",
      url: "/admin/food-entries",
      data,
    });
    return res;
  }

  static async adminUpdateFoodEntry(id: number, data: any) {
    console.log({ data });
    const res = await fetchAxios({
      method: "put",
      data,
      url: `/admin/food-entries/${id}`,
    });
    return res;
  }

  static async adminRemoveFoodEntry(id: number) {
    const res = await fetchAxios({
      method: "delete",
      url: `/admin/food-entries/${id}`,
    });
    return res;
  }
}
