"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "@/lib/store/slices/users";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return null;
}
