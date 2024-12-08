
import { ApolloFormat } from "@/components/api-req/cinemas/ApolloFormat";
import { ArtisFormat } from "@/components/api-req/cinemas/ArtisFormat";
import { ThuleFormat } from "@/components/api-req/cinemas/ThuleFormat";
import { ViimsiFormat } from "@/components/api-req/cinemas/ViimsiFormat";

export default async function Index() {
  return (
    <main className="grid gap-4 grid-cols-1 p-4">
      <div className="apollo-movies">
        <ApolloFormat />
      </div>
      <br />
      <div className="thule-movies">
        <ThuleFormat />
      </div>
      <br />
      <div className="artis-movies">
        <ArtisFormat />
      </div>
      <br />
      <div className="viimsi-movies">
        <ViimsiFormat />
      </div>
    </main>
  );
}
