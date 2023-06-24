"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import React from "react";
import Link from "next/link";
import { useState } from "react";

export default async function Navbar() {
  let [isOpenSearch, setIsOpenSearch] = useState<number>(0);

  return (
    <header>
      <div className="bg-gray-800 h-14"></div>
      <div className="w-11/12 xl:w-10/12 bg-gray-900 mx-auto -mt-7 mb-7 px-6 py-4 rounded-xl flex justify-between items-center">
        <div className="md:w-3/12 xl:w-2/12 flex">
          <Link href={"/"}>
            <div>
              <Image
                src={"/favicon.png"}
                alt={"GreenMag"}
                width={45}
                height={45}
              />
            </div>
          </Link>
          <div className="mr-1">
            <Link href={"/"}>
              <h1 className="text-xl">گرین مگ</h1>
            </Link>
            <h2 className="text-sm cursor-default">خانه عاشقان فناوری</h2>
          </div>
        </div>
        <div className="hidden md:block w-7/12 xl:w-8/12">
          <div className="bg-gray-800 w-full flex justify-evenly py-3 xl:py-4 rounded-xl">
            {/* {categorys.map((category: any) => {
              return (
                <div>
                  <Link href={"/category/slug"}>{category.name}</Link>
                </div>
              );
            })} */}
          </div>
        </div>
        <div className="md:w-3/12 xl:w-2/12 flex space-x-3" dir="ltr">
          <div className="relative">
            <button className="bg-gray-950 hover:bg-green-500 rounded-lg p-2 flex items-center justify-center">
              <FiUser size={25} />
            </button>
            <div className="hidden">eweq</div>
          </div>
          <div className="relative">
            <div
              className="bg-gray-950 hover:bg-green-500 rounded-lg p-2 flex items-center justify-center"
              onClick={() => {
                setIsOpenSearch(isOpenSearch + 1);
              }}
            >
              <BiSearchAlt size={25} />
            </div>
            <div className={`absolute w-52 -left-20 top-12`}>
              <form>
                <input
                  type="text"
                  className="border text-gray-400 text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-950 text-right"
                  placeholder="...جستوجو"
                />
              </form>
            </div>
          </div>
          <div className="bg-gray-950 hover:bg-green-500 cursor-pointer rounded-lg p-2 flex items-center justify-center">
            <HiOutlineBellAlert size={25} />
          </div>
        </div>
      </div>
    </header>
  );
}
