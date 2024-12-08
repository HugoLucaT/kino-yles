"use client";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDateTime } from "../../../utils/utils";

export interface IShow {
  OriginalTitle: string;
  Title: string;
  dttmShowStart: string;
  TheatreAndAuditorium: string;
  Genres: string;
  Images: {
    EventMediumImagePortrait: string;
  };
}

interface ShowProps {
  show: IShow;
  index: number;
}

export default function CityFormat({ show, index }: ShowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={index}
      className="relative p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 0, transition: "z-index 0.3s" }}>
      <div className="relative">
        <Link href={`/tartu/${removeSpecialCharacters(show.OriginalTitle)}`}>
          {show.Images.EventMediumImagePortrait && (
            <img
              src={show.Images.EventMediumImagePortrait}
              alt={show.Title}
              className="mt-2 rounded-sm"
            />
          )}
        </Link>
        {isHovered && (
          <motion.div
            className="absolute w-full left-3/4 top-1/3 transform -translate-y-1/2 flex flex-col items-center justify-center bg-opacity-95 bg-zinc-900 text-white p-4 z-50 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: -20, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <p className="text-lg">
              <strong>{show.Title}</strong>
            </p>
            <p className="italic text-base">
              <strong>Originaalne pealkiri:</strong> <br />
              {show.OriginalTitle}
            </p>
            <p className="text-lg">
              <strong>Algus:</strong> <br />{" "}
              {formatDateTime(show.dttmShowStart)}
            </p>
            <p className="text-lg">
              <strong>Asukoht:</strong> <br /> {show.TheatreAndAuditorium}
            </p>
            <p className="text-lg">
              <strong>Žanr:</strong> <br />
              {show.Genres}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
