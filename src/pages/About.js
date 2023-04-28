import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="flex-1 w-full h-full max-w-[1200px] mx-auto flex flex-col relative justify-center items-center p-4">
      <img
        src="/assets/profile.webp"
        fill
        alt="Profile Pic"
        className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] object-cover relative rounded-full mx-auto"
      />
      <div className="w-full md:w-[60%] mx-auto my-10 flex flex-col gap-2">
        <h3 className="text-xl md:text-3xl font-bold">About Me:</h3>
        <p className="indent-8">
          Hey, I'm <span className="text-xl font-semibold">Victor</span>. I've been working with website developing since I was
          in the 3rd grade. When I was younger, I had this dream of one day
          becoming a programmer and developing my own websites when I grew up.
          Life had other plans in mind...
        </p>
        <p className="indent-8">
          After highschool pursued other opportunities after I graduated
          including becoming a assistant manager at a major retail corporation
          when I turned 20, then moving over to a store manager of a fast food
          chain at 25. Today I work as an LPN in a doctors office, where I
          started at at the height of COVID
        </p>
        <p className="indent-8">
          Now I'm taking the time to get back into what the childhood me wanted.
          I returned to school 2 years ago part-time working towards getting my
          Associates in Computer Science. In my free time, I do a lot of work
          learning web developing and working with frontend and some back end
          products like this blog site that I made using NextJs and Firebase as
          my database.
        </p>
      </div>
      <h3 className="text-2xl text-center">Come follow me as I post about my journey on my <Link href="/PostsPage" className="animate-pulse cursor-pointer">Blog</Link> </h3>
    </div>
  );
};

export default About;
