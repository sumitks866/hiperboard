"use client";

import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      >
        <div>hello</div>
      </Modal>
      <header className="bg-gray-800 w-full h-16 flex items-center fixed top-0 z-50 text-white">
        <div className="font-bold text-lg w-1/6 h-full flex items-center pl-8">
          <Image
            src="/monoWhiteInverted-DefaultLogo-200px.png"
            alt="hiperboard logo"
            width={150}
            height={0}
          />
        </div>

        <div className="flex flex-1 h-full justify-center">
          <button
            className="mx-4 hover:bg-black px-4"
            onClick={() => setIsCreateTaskOpen(true)}
          >
            Create
          </button>
        </div>

        {/* </div> */}

        {/* <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="text-white flex justify-between items-center">
              <div className="text-white font-bold text-lg w-1/6 bg-red-200">
                HiperBoard
              </div>
              <div className="ml-20">
                <button className="" onClick={() => setIsCreateTaskOpen(true)}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </header>
    </>
  );
}
