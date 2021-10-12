import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import APIClient from "../APIClient";
import { User } from "../types";
import { isAdmin } from "../UserUtils";

export default function useOnlyAdmin() {
  const router = useRouter();

  useEffect(() => {
    APIClient.getCurrentUser()
      .then((user: User) => {
        if (!isAdmin(user)) {
          throw new Error("This user is not admin");
        }
      })
      .catch(() => {
        toast.error("You are not allowed to access this page");
        router.replace("/");
      });
  }, []);
}
