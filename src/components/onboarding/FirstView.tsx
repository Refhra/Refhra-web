import { preloadedTemplate } from "@/Data/PreloadedTemplate";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const FirstView = () => {
  return (
    <div className="relative w-full lg:h-full h-screen ">
      <div className=" absolute z-10 top-0 w-full h-full   bg-black/50">
        <div className="h-full w-full mt-20 lg:mt-0  my-auto flex items-center justify-center mx-auto">
          <div className="lg:h-[80%] h-fit  w-[90%] lg:w-1/2 top-14 flex rounded-2xl flex-col text-center items-center bg-white text-black p-8 ">
            <div className="flex gap-4 items-center max-w-2xl mb-10 justify-center w-full h-fit flex-col">
              {/* <h1 className="font-bold text-4xl text-black">1.</h1> */}
              <h1 className="font-medium  text-4xl text-black">
                Select A Schedule Template
              </h1>
              <p className="font-normal text-base">
                choose a preloaded task template category according to what fits
                you best or your personality.
              </p>
            </div>

            <div className="grid w-full h-fit gap-10 grid-cols-2 ">
              {preloadedTemplate.map((item) => (
                <button
                  key={item.title}
                  className="w-full min-h-36 cursor-pointer h-30 border border-border flex p-2 flex-col gap-4 rounded-2xl hover:border-blue-300 hover:shadow-blue-300 hover:shadow-sm  "
                >
                  <h1 className="font-bold text-lg">{item.title}</h1>
                  <p className="font-normal text-base">{item.description}</p>
                </button>
              ))}
            </div>
            <div className="w-full mt-4 flex justify-end">
              <Button className="text-lg flex items-center font-bold">
                <span>Next</span>{" "}
                <span>
                  <ArrowRight className="h-8 w-8 font-bold " />
                </span>
              </Button>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default FirstView;
