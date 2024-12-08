export interface ThuleXML {
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
  EventType: string;
  Genres: string;
  TheatreID: number;
  TheatreAuditriumID: number;
  Theatre: string;
  TheatreAuditorium: string;
  TheatreAndAuditorium: string;
  PresentationMethodAndLanguage: string;
  PresentationMethod: string;
  EventSeries: string;
  ShowURL: string;
  EventURL: string;
  SpokenLanguage: SpokenLanguage;
  SubtitleLanguage1?: SpokenLanguage;
  SubtitleLanguage2?: SpokenLanguage;
  Images: Images;
  ContentDescriptors: string;
}

export interface Images {
  EventMediumImagePortrait: string;
}

export interface SpokenLanguage {
  Name: Name;
  NameInLanguage: string;
  ISOTwoLetterCode: string;
}

export enum Name {
  Eesti = "Eesti",
  Empty = "",
  Inglise = "Inglise",
}
