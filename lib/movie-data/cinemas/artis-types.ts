export interface ArtisJSON {
  PubDate: string //Date;
  Shows: Show[];
}

export interface Show {
  ID: number;
  AvailableSeats: null;
  TotalSeats: null;
  dtAccounting: string //Date;
  dttmShowStart: string //Date;
  dttmShowStartUTC: string //Date;
  dttmShowEnd: string //Date;
  dttmShowEndUTC: string //Date;
  ShowSalesStartTime: string //Date;
  ShowSalesStartTimeUTC: string //Date;
  ShowSalesEndTime: string //Date;
  ShowSalesEndTimeUTC: string //Date;
  ShowReservationStartTime: string //Date;
  ShowReservationStartTimeUTC: string //Date;
  ShowReservationEndTime: string //Date;
  ShowReservationEndTimeUTC: string //Date;
  EventID: number;
  Title: string;
  OriginalTitle: string;
  ProductionYear: number;
  LengthInMinutes: number;
  dtLocalRelease: string //Date;
  Rating: string;
  RatingLabel: string;
  RatingImageUrl: string;
  EventType: EventType;
  Genres: string;
  TheatreID: number;
  TheatreAuditriumID: number;
  Theatre: Theatre;
  TheatreAuditorium: TheatreAuditorium;
  TheatreAndAuditorium: TheatreAndAuditorium;
  PresentationMethod: PresentationMethod;
  EventSeries: EventSeries;
  ShowURL: string;
  EventURL: string;
  SpokenLanguage: SpokenLanguage;
  SubtitleLanguage1: SpokenLanguage;
  SubtitleLanguage2: SpokenLanguage | null;
  Images: Images;
  ContentDescriptors: any[];
}

export enum EventSeries {
  Empty = "",
  KolmegaKellKolm = "Kolmega kell kolm",
}

export enum EventType {
  Movie = "Movie",
}

export interface Images {
  EventMicroImagePortrait: string;
  EventSmallImagePortrait: string;
  EventMediumImagePortrait: string;
  EventLargeImagePortrait: string;
  EventSmallImageLandscape: null;
  EventLargeImageLandscape: null;
}

export enum PresentationMethod {
  The2D = "2D",
  The3D = "3D"
}

export interface SpokenLanguage {
  Name: null | string;
  NameInLanguage: null | string;
  ISOTwoLetterCode: ISOTwoLetterCode;
}

export enum ISOTwoLetterCode {
  Empty = "",
  En = "en",
  Et = "et",
  Ru = "ru",
}

export enum Theatre {
  Artis = "Artis",
}

export enum TheatreAndAuditorium {
  ArtisSaal1 = "Artis, Saal 1",
  ArtisSaal2 = "Artis, Saal 2",
}

export enum TheatreAuditorium {
  Saal1 = "Saal 1",
  Saal2 = "Saal 2",
}
