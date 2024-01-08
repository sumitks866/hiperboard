"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { isEmpty, isNull } from "lodash";

import { signup } from "@/lib/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpStep, setSignUpStep] = useState<1 | 2>(1);

  const dispatch = useDispatch<AppDispatch>();

  const { isSigningUp, activeUser } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (!isNull(activeUser)) {
      window.location.href = "/home";
    }
  }, [activeUser]);

  const handleSignup = async () => {
    if (signUpStep === 1) {
      setSignUpStep(2);
      return;
    }
    try {
      dispatch(signup({ name, email, password }));
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
      <h3 className="text-[14px] mt-6 mb-4 font-semibold">
        Sign up to continue
      </h3>
      <input
        type="text"
        name="fullname"
        className="border border-gray-800 w-full px-2 py-2 rounded-sm bg-gray-100 focus:bg-white "
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
      />
      <input
        type="email"
        name="email"
        className="border border-gray-800 w-full px-2 py-2 mt-2 rounded-sm bg-gray-100 focus:bg-white "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      {signUpStep === 2 && (
        <input
          type="password"
          name="password"
          className="border border-gray-800 w-full px-2 py-2 mt-2 rounded-sm bg-gray-100 focus:bg-white "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      )}

      <div className="text-xs text-gray-500 my-4">
        By signing up, I accept the terms and conditions.
      </div>

      <button
        className="bg-gray-700 hover:bg-gray-800 text-white mt-2 w-full rounded-sm py-2 cursor-pointer"
        disabled={isEmpty(name) || isEmpty(email) || isSigningUp}
        onClick={handleSignup}
      >
        {isSigningUp
          ? "Signing up ..."
          : signUpStep === 1
          ? "Continue"
          : "Sign up"}
      </button>
      <h3 className="text-[14px] mt-6 mb-4 font-semibold">Or continue with</h3>
      <button className="flex items-center justify-center py-2 border border-gray-800 w-full hover:bg-gray-50 rounded-sm">
        <Image
          alt="sign up with google"
          src="/icons8-google-color/icons8-google-48.svg"
          width={24}
          height={24}
        />
        <span className="font-semibold ml-2 text-sm">Google</span>
      </button>

      <div className="mt-6 text-[13px]">
        <span>Already have an account?</span>{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
