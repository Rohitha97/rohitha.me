"use client";

import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import localFont from "next/font/local";

import village from "public/gallery/village.jpg";
import random from "public/gallery/random-click.jpg";
import sakura from "public/gallery/sakura.jpg";
import japan from "public/gallery/japan.jpg";
// import { ticket } from "/ticketing.woff2";

import Halo from "@/components/ui/Halo";

// const ticketingFont = localFont({
//   src: ticket,
//   display: "swap",
// });

type PhotoProps = {
  src: StaticImageData | string;
  meta?: ReactNode;
  filename?: string;
  alt: string;
  width: number;
  height: number;
  rotate: number;
  left: number;
  index: number;
  flipDirection?: "left" | "right";
  children?: ReactNode;
};

function Photo({
  src,
  alt,
  filename,
  width,
  height,
  rotate,
  left,
  index,
  flipDirection,
  meta,
  children,
}: PhotoProps) {
  const fileName =
    filename ||
    (typeof src !== "string" &&
      `${src.src.split("/").at(-1)?.split(".")[0]}.jpg`);
  const shared = "absolute h-full w-full rounded-2xl overflow-hidden";
  return (
    <motion.div
      className={`absolute mx-auto cursor-grab hover:before:absolute hover:before:-left-7 hover:before:-top-8 hover:before:block hover:before:h-[300px] hover:before:w-[calc(100%+55px)]`}
      style={{ rotate: `${rotate}deg`, left, width, height, perspective: 1000 }}
      initial={{
        width,
        height,
        rotate: (rotate || 0) - 20,
        y: 200 + index * 20,
        x: index === 1 ? -60 : index === 2 ? -30 : index === 3 ? 30 : 60,
        opacity: 0,
      }}
      transition={{
        default: {
          type: "spring",
          bounce: 0.2,
          duration:
            index === 1 ? 0.8 : index === 2 ? 0.85 : index === 3 ? 0.9 : 1,
          delay: index * 0.15,
        },
        opacity: {
          duration: 0.7,
          ease: [0.23, 0.64, 0.13, 0.99],
          delay: index * 0.15,
        },
        scale: { duration: 0.12 },
      }}
      animate={{ width, height, rotate, y: 0, opacity: 1, x: 0 }}
      drag
      whileTap={{ scale: 1.1, cursor: "grabbing" }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover="flipped"
    >
      <motion.div
        className="relative h-full w-full rounded-2xl shadow-md will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", duration: 0.4 }}
        variants={{
          flipped: {
            scale: 1.1,
            rotateY: flipDirection === "right" ? -180 : 180,
            rotateX: 5,
          },
        }}
      >
        <div className={shared} style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-gray-400 object-cover "
            priority
          />
          {children}
        </div>
        <div
          className={clsx(
            shared,
            "flex items-center overflow-hidden rounded-2xl bg-[#0A0A0C] border border-white/5",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Halo strength={80} className="flex items-center justify-center">
            {/* Technical grid pattern */}
            <div 
              className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: "radial-gradient(#DBDBDB 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="z-[1] px-6 text-center">
              <div className="flex flex-col gap-2 uppercase tracking-widest">
                <p className="font-display text-lg font-bold text-white drop-shadow-md">{fileName}</p>
                {meta && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-4 bg-[#BFFF00]/50" />
                    <p className="font-mono text-xs text-gray-400">{meta}</p>
                    <span className="h-px w-4 bg-[#BFFF00]/50" />
                  </div>
                )}
              </div>
            </div>
          </Halo>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <>
      <section className="relative flex h-[268px] gap-4">
        <Photo
          src={village}
          meta="2023-03-27"
          alt="Village"
          width={324}
          height={239}
          rotate={-6}
          left={-86}
          index={1}
        />
        <Photo
          src={japan}
          meta="2024-02-25"
          alt="Japan "
          width={230}
          height={250}
          rotate={6.3}
          left={188}
          index={2}
          flipDirection="left"
        />
        <Photo
          src={sakura}
          meta="2024-04-03"
          alt="Sakura"
          width={280}
          height={235}
          rotate={-5.4}
          left={343}
          index={3}
        />
        <Photo
          src={random}
          meta="2023-04-16"
          alt={"Random Click"}
          width={230}
          height={250}
          rotate={7.6}
          left={557}
          index={4}
          flipDirection="left"
        />
      </section>
    </>
  );
}
