"use client";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Event } from "@/lib/event-data/cinemas/event-types";

export interface IMovie {
  OriginalTitle: string;
  Title: string;
  Rating: string;
  Genres: string;
  ShortSynopsis: string;
  EventMediumImagePortrait: string;
}

export default function MainPageMovie(movie: Event) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative p-2">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 0, transition: "z-index 0.3s" }}>
        <Link href={`/eesti/${removeSpecialCharacters(movie.OriginalTitle)}`}>
          <motion.img
            src={movie.Images.EventMediumImagePortrait}
            alt={movie.Title}
            className="w-full h-auto md:h-auto rounded-sm hover:z-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98, rotate: 0.45 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        {isHovered && (
          <motion.div
            className="absolute w-full left-3/4 top-1/3 transform -translate-y-1/2 flex flex-col items-center justify-center bg-opacity-95 bg-zinc-900 text-white p-4 z-50 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: -20, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <Link
              href={`/eesti/${removeSpecialCharacters(movie.OriginalTitle)}`}>
              <h2 className="text-xl font-bold">{movie.Title}</h2>
            </Link>
            <p className="italic text-sm">{movie.OriginalTitle}</p>
            <p className="text-sm">Vanus: {movie.Rating}</p>
            <p className="text-sm">Žanr: {movie.Genres}</p>
            <p className="mt-2">{movie.ShortSynopsis}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
