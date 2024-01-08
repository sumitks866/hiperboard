import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomepageHeader() {
  return (
    <header className="w-full px-32 fixed top-0 flex h-16 items-center z-50 bg-white justify-between">
      <Link href="/">
        <Image
          src="/logobanner200px.png"
          alt="hiperboard logo"
          width={150}
          height={0}
        />
      </Link>

      <button className="bg-gray-800 text-white px-6 py-2 rounded-full">
        Login
      </button>
    </header>
  );
}
