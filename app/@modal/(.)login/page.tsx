"use client";
import Login from "@/components/Auth/Login";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import React from "react";

export default function InterceptedLogin() {
  const router = useRouter();
  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <Login />
    </Modal>
  );
}
