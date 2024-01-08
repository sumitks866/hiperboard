"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/lib/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { isNull } from "lodash";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginStep, setLoginStep] = useState<1 | 2>(1);

  const dispatch = useDispatch<AppDispatch>();

  const { isLoggingIn, activeUser } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (!isNull(activeUser)) {
      window.location.href = "/home";
    }
  }, [activeUser]);

  const handleLogin = async () => {
    if (loginStep === 1) {
      setLoginStep(2);
      return;
    }
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-[400px] py-6 px-12 flex flex-col items-center text-sm">
      <Image
        src="/logobanner200px.png"
        alt="hiperboard logo"
        width={150}
        height={0}
      />
      <h3 className="text-[14px] mt-6 mb-4 font-semibold">Login to continue</h3>
      <input
        type="email"
        className="border border-gray-800 w-full px-2 py-2 rounded-sm bg-gray-100 focus:bg-white "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      {loginStep === 2 && (
        <input
          type="password"
          name="password"
          className="border border-gray-800 w-full px-2 py-2 mt-2 rounded-sm bg-gray-100 focus:bg-white "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      )}
      <button
        className="bg-gray-700 hover:bg-gray-800 text-white mt-2 w-full rounded-sm py-2"
        onClick={handleLogin}
      >
        {isLoggingIn
          ? "Logging in..."
          : loginStep === 1
          ? "Continue"
          : "Log in"}
      </button>
      <h3 className="text-[14px] mt-6 mb-4 font-semibold">Or Login with</h3>
      <button className="flex items-center justify-center py-2 border border-gray-800 w-full hover:bg-gray-50 rounded-sm">
        <Image
          alt="login with google"
          src="/icons8-google-color/icons8-google-48.svg"
          width={24}
          height={24}
        />
        <span className="font-semibold ml-2 text-sm">Google</span>
      </button>

      <div className="mt-6 text-[13px]">
        <span>New to HiperBoard?</span>{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
