export interface ViimsiXML {
  "?xml": string;
  Schedule: Schedule;
}

export interface Schedule {
  PubDate: string //Date;
  Shows: Shows;
}

export interface Shows {
  Show: Show[];
}

export interface Show {
  ID: number;
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
  TheatreAuditorium: string;
  TheatreAndAuditorium: string;
  PresentationMethodAndLanguage: PresentationMethod;
  PresentationMethod: PresentationMethod;
  EventSeries: EventSeries;
  ShowURL: string;
  EventURL: string;
  SpokenLanguage: SpokenLanguage;
  Images: Images;
  ContentDescriptors: string;
  SubtitleLanguage1?: SpokenLanguage;
  SubtitleLanguage2?: SpokenLanguage;
}

export enum EventSeries {
  Empty = "",
  The4K = "4K",
  The4KEellinastus = "4K, Eellinastus",
}

export enum EventType {
  Movie = "Movie",
}

export interface Images {
  EventMicroImagePortrait: string;
  EventSmallImagePortrait: string;
  EventMediumImagePortrait: string;
  EventLargeImagePortrait: string;
  EventSmallImageLandscape: string;
  EventLargeImageLandscape: string;
}

export enum PresentationMethod {
  The2D = "2D",
  The2DEestiKeeles = "2D, Eesti keeles",
  The2DVeneKeeles = "2D, Vene keeles",
}

export interface SpokenLanguage {
  Name: Name;
  NameInLanguage: NameInLanguage;
  ISOTwoLetterCode: ISOTwoLetterCode;
}

export enum ISOTwoLetterCode {
  En = "en",
  Et = "et",
  Ru = "ru",
}

export enum Name {
  Eesti = "Eesti",
  Inglise = "Inglise",
  Vene = "Vene",
}

export enum NameInLanguage {
  EestiKeeles = "Eesti keeles",
  IngliseKeeles = "Inglise keeles",
  VeneKeeles = "Vene keeles",
}

export enum Theatre {
  ViimsiKino = "Viimsi Kino",
}
