"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/navbar";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </>
  );
}
