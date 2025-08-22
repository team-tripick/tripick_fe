"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLoginCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);
};
