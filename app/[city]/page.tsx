import ApolloKino from "@/components/api-req/cinemas/apollokino";
import Artis from "@/components/api-req/cinemas/artis";
import Thule from "@/components/api-req/cinemas/thule";
import Viimsi from "@/components/api-req/cinemas/viimsi";
import Johvi from "@/components/api-req/cities/johvi";
import Narva from "@/components/api-req/cities/narva";
import Parnu from "@/components/api-req/cities/parnu";
import Saaremaa from "@/components/api-req/cities/saaremaa";
import Tallinn from "@/components/api-req/cities/tallinn";
import Tartu from "@/components/api-req/cities/tartu";
import Viljandi from "@/components/api-req/cities/viljandi";
import { Link } from "lucide-react";

export default async function Index({ params }: { params: { city: string } }) {
  const { city } = await params;
  if (city == "tallinn") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Tallinn</h1>
          <Tallinn />
        </main>
      </>
    );
  }
  if (city == "tartu") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Tartu</h1>
          <Tartu />
        </main>
      </>
    );
  }
  if (city == "parnu") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Pärnu</h1>
          <Parnu />
        </main>
      </>
    );
  }
  if (city == "saaremaa") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Saaremaa</h1>
          <Saaremaa />
        </main>
      </>
    );
  }
  if (city == "narva") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Narva</h1>
          <Narva />
        </main>
      </>
    );
  }
  if (city == "viljandi") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Viljandi</h1>
          <Viljandi />
        </main>
      </>
    );
  }
  if (city == "johvi") {
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h1 className="bold text-pink-500">Jõhvi</h1>
          <Johvi />
        </main>
      </>
    );
  }
  return (
    <>
      <Link href="/tallinn">Tallinn</Link>
      <Link href="/saaremaa">Saaremaa</Link>
      <Link href="/tartu">Tartu</Link>
      <Link href="/pärnu">Pärnu</Link>
      <Link href="/narva">Narva</Link>
      <Link href="/jõhvi">Jõhvi</Link>
      <Link href="/viljandi">Viljandi</Link>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="bold text-pink-500">Apollokino</h1>
        <ApolloKino />
        <hr />
        <h1 className="bold text-pink-500">Artis</h1>
        <Artis />
        <hr />
        <h1 className="bold text-pink-500">Viimsi</h1>
        <Viimsi />
        <hr />
        <h1 className="bold text-pink-500">Thule</h1>
        <Thule />
      </main>
    </>
  );
}
