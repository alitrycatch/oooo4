"use client";

import { login, logout } from "@/lib/auth-action";
import { Session } from "next-auth";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-5 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image alt="Logo" src={"/globe.svg"} width={50} height={50} />
          <span className="px-1 text-2xl font-bold text-gray-600">
            Travel Guide
          </span>
        </Link>
        <div className="flex items-center space-x-3">
          {session ? (
            <>
              <Link
                href={"/plans"}
                className="transition text-slate-900 hover:text-sky-400 hover:border-b-2 hover:border-blue-900"
              >
                Plans Trip
              </Link>
              <Link
                href={"/globs"}
                className="transition text-slate-900 hover:text-sky-400 hover:border-b-2 hover:border-blue-900"
              >
                Globs
              </Link>
              <button
                onClick={logout}
                className="transition cursor-pointer flex items-center justify-center bg-gray-700 hover:bg-gray-400 hover:border-b-2 hover:border-blue-900 rounded-sm text-white p-1 focus:border-0"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="transition cursor-pointer flex items-center justify-center bg-gray-700 hover:bg-gray-400 hover:border-b-2 hover:border-blue-900 rounded-sm text-white p-1 focus:border-0"
            >
              Sing in
              <Image
                className="ml-1.5 text-white"
                src={"/login.svg"}
                alt="sing in..."
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
