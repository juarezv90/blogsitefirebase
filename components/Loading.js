import { useAppContext } from "@context/PostContext";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  const { loading } = useAppContext();

  return (
    <div className="text-black w-full flex flex-col justify-center items-center mt-4 col-span-2 my-10">
      <AiOutlineLoading className="text-[4rem] font-bold animate-spin " />
      <h1 className="text-xl">loading...</h1>
    </div>
  );
};

export default Loading;
