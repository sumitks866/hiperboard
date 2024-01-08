"use client";
import Signup from "@/components/Auth/Signup";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import React from "react";

export default function InterceptedSignup() {
  const router = useRouter();
  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <Signup />
    </Modal>
  );
}
