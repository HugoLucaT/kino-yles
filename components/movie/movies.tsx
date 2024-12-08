"use client";

import { getApolloEvents } from "@/lib/event-data/cinemas/apollo-events";
import { getArtisEvents } from "@/lib/event-data/cinemas/artis-events";
import { getThuleEvents } from "@/lib/event-data/cinemas/thule-events";
import { getViimsiEvents } from "@/lib/event-data/cinemas/viimsi-events";
import { getJohviSchedule } from "@/lib/movie-data/cities/johvi";
import { getNarvaSchedule } from "@/lib/movie-data/cities/narva";
import { getParnuSchedule } from "@/lib/movie-data/cities/parnu";
import { getSaaremaaSchedule } from "@/lib/movie-data/cities/saaremaa";
import { getTallinnSchedule } from "@/lib/movie-data/cities/tallinn";
import { getTartuSchedule } from "@/lib/movie-data/cities/tartu";
import { getViljandiSchedule } from "@/lib/movie-data/cities/viljandi";
import { getEstoniaSchedule } from "@/lib/movie-data/eesti";
import apolloPriceCalculation from "@/lib/price/apollo-price";
import artisPriceCalculation from "@/lib/price/artis-price";
import thulePriceCalculation from "@/lib/price/thule-price";
import viimsiPriceCalculation from "@/lib/price/viimsi-price";
import { removeSpecialCharacters } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { formatDateTime } from "@/utils/utils";
import { format } from "path";

interface Data {
  dttmShowStart: string; // Date;
  Title: string;
  OriginalTitle: string;
  ShowURL: string;
  Theatre: string;
  TheatreAuditorium: string;
  Price: string;
}

export default function OthersMovie(info: any) {
  const [firstShow, setFirstShow] = useState<any>(null);
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preloadFirstShow = async () => {
      try {
        const decodedMovie = decodeURIComponent(info.movie);
        let eventData = await getApolloEvents();
        let filteredEvents = eventData.filter(
          (event) =>
            removeSpecialCharacters(event.OriginalTitle) === decodedMovie
        );
        if (!filteredEvents[0]) {
          eventData = await getArtisEvents();
          filteredEvents = eventData.filter(
            (event) =>
              removeSpecialCharacters(event.OriginalTitle) === decodedMovie
          );
        }
        if (!filteredEvents[0]) {
          eventData = (await getViimsiEvents()).Events.Event;
          filteredEvents = eventData.filter(
            (event) =>
              removeSpecialCharacters(event.OriginalTitle) === decodedMovie
          );
        }
        if (!filteredEvents[0]) {
          eventData = (await getThuleEvents()).Events.Event;
          filteredEvents = eventData.filter(
            (event) =>
              removeSpecialCharacters(event.OriginalTitle) === decodedMovie
          );
        }
        setFirstShow(filteredEvents[0] || null);
      } catch (err) {
        console.error("Error preloading first show data:", err);
        setError("Failed to preload first show data.");
      }
    };

    preloadFirstShow();
  }, [info.movie]);

  const fetchFilteredShows = async () => {
    setIsLoading(true);
    setError(null);
    setHasFetched(false);

    try {
      const decodedMovie = decodeURIComponent(info.movie);
      let fetchedData: Data[] = [];
      const supabase = createClient();
      //console.log(supabaseData);
      //let holidayDates = await getHolidays();
      const userData = await supabase.auth.getUser();
      const userId = userData?.data?.user?.id;

      if (!userId) {
        //console.error("User ID not found");
        //return;
      }

      // Query to fetch user memberships with membership details and user's birth date
      let { data: supabaseData, error: supabaseError } = await supabase
        .from("user_membership")
        .select(
          `
        id,
        user_id,
        membership_id,
        membership (id, title, cinema_id, discount_type),
        user_data (auth_uuid, birth_date)
    `
        )
        .eq("user_id", userId);
      if (!supabaseData) {
        supabaseData = [
          {
            id: 5000,
            membership: {
              id: 500000,
              title: "Klubi",
              cinema_id: 2,
              discount_type: "percentage",
            },
            membership_id: 500000,
            user_data: {
              auth_uuid: "0",
              birth_date: "2000-01-01",
            },
          },
        ];
      }
      if (info.city === "tallinn") {
        const [dataApollo, dataArtis, dataViimsi] =
          await Promise.all(getTallinnSchedule());
        dataApollo.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: apolloPriceCalculation(element, supabaseData),
            });
          }
        });
        dataArtis.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: artisPriceCalculation(element, supabaseData),
            });
          }
        });
        dataViimsi.Schedule.Shows.Show.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: viimsiPriceCalculation(element, supabaseData),
            });
          }
        });
      }

      const cityScheduleFetchers = {
        narva: getNarvaSchedule,
        tartu: getTartuSchedule,
        johvi: getJohviSchedule,
        parnu: getParnuSchedule,
        viljandi: getViljandiSchedule,
      };

      if (cityScheduleFetchers[info.city]) {
        const citySchedule = await cityScheduleFetchers[info.city]();
        citySchedule.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: apolloPriceCalculation(element, supabaseData),
            });
          }
        });
      }

      if (info.city === "saaremaa") {
        const [dataThule, dataApollo] = await Promise.all(
          getSaaremaaSchedule()
        );
        dataApollo.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: apolloPriceCalculation(element, supabaseData),
            });
          }
        });
        dataThule.Schedule.Shows.Show.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: thulePriceCalculation(element, supabaseData),
            });
          }
        });
      }

      if (!info.city || info.city === "eesti") {
        const [apolloData, artisData, viimsiData, thuleData] =
          await Promise.all(getEstoniaSchedule());
        apolloData.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: apolloPriceCalculation(element, supabaseData),
            });
          }
        });
        artisData.Shows.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: artisPriceCalculation(element, supabaseData),
            });
          }
        });
        viimsiData.Schedule.Shows.Show.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: viimsiPriceCalculation(element, supabaseData),
            });
          }
        });
        thuleData.Schedule.Shows.Show.forEach((element) => {
          if (removeSpecialCharacters(element.OriginalTitle) === decodedMovie) {
            fetchedData.push({
              dttmShowStart: element.dttmShowStart,
              Title: element.Title,
              OriginalTitle: element.OriginalTitle,
              ShowURL: element.ShowURL,
              Theatre: element.Theatre,
              TheatreAuditorium: element.TheatreAuditorium,
              Price: thulePriceCalculation(element, supabaseData),
            });
          }
        });
      }

      const filteredShows = fetchedData.filter(
        (show) => removeSpecialCharacters(show.OriginalTitle) === decodedMovie
      );

      setData(filteredShows);
    } catch (err) {
      console.error("Error fetching schedule data:", err);

      setError("Kava ei suudetud tehnilise errori tõttu laadida.");
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      {firstShow && (
        <div className="flex flex-col border border-gray-300 rounded-lg p-7 mb-5">
          {firstShow.Images?.EventMediumImagePortrait && (
            <div className="w-full mb-5 justify-center justify-items-center">
              <img
                src={firstShow.Images.EventMediumImagePortrait}
                alt={firstShow.Title}
                className="w-full md:w-1/2 rounded-lg object-cover"
              />
              {/* md:w-1/2 -- Changes the width of the image, maybe needs to be adjusted. */}
            </div>
          )}

          {/* This will make the text more readable, at the cost of the page looking clunkier */}
          {/* <span className="text-justify text-lg"> */}
          <div className="flex flex-col justify-between w-full">
            <h1 className="mb-2 text-4xl px-1 hover:bg-slate-400 hover:bg-opacity-5">
              {firstShow.Title}{" "}
            </h1>
            <p className="mb-2 translate-x-1 italic border-b-4 my-2 hover:bg-slate-400 hover:bg-opacity-5">
              {firstShow.OriginalTitle}
            </p>

            <p className="mb-2 border-b-2 my-3 hover:bg-slate-400 hover:bg-opacity-5">
              <strong>Vanusepiirang:</strong> {firstShow.Rating}
            </p>
            <p className="mb-2 border-b-2 my-3 hover:bg-slate-400 hover:bg-opacity-5">
              <strong>Žanrid:</strong> {firstShow.Genres}
            </p>
            <p className="mb-2 whitespace-pre-line my-4 hover:bg-slate-400 hover:bg-opacity-5">
              <strong>Lühikirjeldus:</strong> {firstShow.Synopsis}
            </p>
          </div>
          {/* </span> */}
        </div>
      )}

      <div className="flex flex-col border border-gray-300 rounded-lg p-7 mb-5 ">
        <h1 className="text-2xl font-bold mb-5">Linastuse ajad</h1>

        {!data.length && !isLoading && !error && (
          <Button className="px-4 py-2 transition" onClick={fetchFilteredShows}>
            Kuva kava
          </Button>
        )}

        {isLoading && (
          <h1 className="text-gray-400 animate-bounce">Kava laadimine...</h1>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {hasFetched && data.length === 0 && !isLoading && !error && (
          <p>Lähima 30 päeva jooksul linastused puuduvad</p>
        )}

        <div className="grid md:grid-cols-1 gap-5">
          {data.map((show, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg hover:bg-slate-400 hover:bg-opacity-5"
            >
              <p className="mb-2 border-spacing-3 border-b">
                <strong>Esituse algus:</strong>
                {formatDateTime(show.dttmShowStart)}
              </p>
              <p className="mb-2 border-spacing-3 border-b">
                <strong>Auditoorium:</strong> {show.TheatreAuditorium}
              </p>
              <p className="mb-2 border-spacing-3 border-b">
                <strong>Asukoht:</strong> {show.Theatre}
              </p>
              <p className="mb-2 border-spacing-3 border-b">
                <strong>Eeldatav tavatooli hind: </strong> {show.Price}
              </p>
              <Link
                href={show.ShowURL}
                className="text-blue-500 hover:underline"
              >
                {show.ShowURL}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
