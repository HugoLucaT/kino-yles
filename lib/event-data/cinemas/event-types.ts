export interface ApolloEventsJSON {
  Events: Event[];
}

export enum RatingLabel {
  K12 = "K-12",
  K14 = "K-14",
  K16 = "K-16",
  L = "L",
  MS12 = "MS-12",
  Pere = "PERE",
  None = "(none)"
}

export enum EventType {
    Movie = "Movie",
    Concert = "Concert",
    TheatrePerformance = "TheatrePerformance"
}


export interface CastMember {
    FirstName: string;
    LastName: string;
}

export interface Director {
    FirstName: string;
    LastName: string;
}

export interface Distributor {
    LocalDistributorName: string;
    GlobalDistributorName: string;
}

export interface Picture {
    Title: string;
    Location: string;
    PictureType: string;
}

export interface Images {
    EventMediumImagePortrait: string;
}

export interface Video {
    Title: string;
    Location: string;
    MediaResourceSubType: string;
    MediaResourceFormat: string;
}

export interface EventsData {
    "?xml": string;
    Events: {
      Event: Event[];
    };
  }

export interface Event {
    ID: number;
    Title: string;
    OriginalTitle: string;
    ProductionYear: number;
    LengthInMinutes: number;
    dtLocalRelease: string;
    Rating: string;
    RatingLabel: RatingLabel;
    RatingImageUrl: string | null;
    LocalDistributorName: string;
    GlobalDistributorName: string;
    ProductionCompanies: string;
    EventType: EventType;
    Genres: string;
    ShortSynopsis: string;
    Synopsis: string;
    EventURL: string;
    Images: Images;
    Videos: Video[];
    Cast: CastMember[];
    Directors: Director[];
    Pictures: Picture[];
    Events: Event[];
}