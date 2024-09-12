"use client";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
          alt="img"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
          alt="img"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
          alt="img"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
          alt="img"
        />
      </div>
      <div className="text-center lg:max-w-3xl max-w-xl lg:mx-0 mx-10">
        <h2 className="font-bold lg:text-[60px] text-[30px] text-slate-700">
          Easy scheduling ahead
        </h2>
        <h2 className="text-xl mt-5 text-slate-500">
          Scheduly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time — and so much more.
        </h2>
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center lg:gap-8 gap-4">
            <LoginLink>
              {" "}
              <Button className="p-7 flex gap-4">
                <Image src="/google.png" alt="google" width={40} height={40} />
                Sign up with Google
              </Button>
            </LoginLink>
            <LoginLink>
              {" "}
              <Button className="p-7 flex gap-4">
                <Image
                  src="/facebook.png"
                  alt="google"
                  width={40}
                  height={40}
                />
                Sign up with Facebook
              </Button>
            </LoginLink>
          </div>
          <hr></hr>
          <h2>
            <span className="text-primary cursor-pointer">
              Sign up Free with Email.
            </span>{" "}
            No Credit card required
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
