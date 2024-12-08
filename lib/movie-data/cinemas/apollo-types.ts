export interface ApolloJSON {
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
  Rating: Rating;
  RatingLabel: RatingLabel;
  RatingImageUrl: string;
  EventType: EventType;
  Genres: string;
  TheatreID: number;
  TheatreAuditriumID: number;
  Theatre: Theatre;
  TheatreAuditorium: string;
  TheatreAndAuditorium: string;
  PresentationMethod: PresentationMethod;
  EventSeries: EventSeries;
  ShowURL: string;
  EventURL: string;
  SpokenLanguage: SpokenLanguage;
  SubtitleLanguage1: SpokenLanguage | null;
  SubtitleLanguage2: SpokenLanguage | null;
  Images: Images;
  ContentDescriptors: any[];
}

export enum EventSeries {
  Hinnacut = "Hinnacut",
  HinnacutDolbyAtmosHeli = "Hinnacut, Dolby Atmos heli",
  HinnacutEestikeelseteSubtiitritega = "Hinnacut, Eestikeelsete subtiitritega",
  HinnacutICESaal = "Hinnacut, ICE saal",
  HinnacutICESaalDolbyAtmosHeli = "Hinnacut, ICE saal, Dolby Atmos heli",
  HinnacutIngliskeelneSeanssSubtiitridPuuduvad = "Hinnacut, Ingliskeelne seanss. Subtiitrid puuduvad.",
  HinnacutKinoklassika = "Hinnacut, Kinoklassika",
  HinnacutVenekeelneSeanss = "Hinnacut, Venekeelne seanss",
  HinnacutVenekeelneSeanssEestiJaVenekeelseSubtiitriga = "Hinnacut, Venekeelne seanss, eesti- ja venekeelse subtiitriga",
}

export enum EventType {
  Movie = "Movie",
}

export interface Images {
  EventMicroImagePortrait: null;
  EventSmallImagePortrait: null;
  EventMediumImagePortrait: string;
  EventLargeImagePortrait: null;
  EventSmallImageLandscape: null;
  EventLargeImageLandscape: null;
}

export enum PresentationMethod {
  Plf = "PLF",
  The2D = "2D",
  The3D = "3D"
}

export enum Rating {
  Alla12AKeelatud = "Alla 12 a. keelatud",
  Alla12AMittesoovitatav = "Alla 12 a. mittesoovitatav",
  Alla14AKeelatud = "Alla 14 a. keelatud",
  Alla16AKeelatud = "Alla 16 a. keelatud",
  LubatudKõigile = "Lubatud kõigile",
  Perefilm = "Perefilm",
}

export enum RatingLabel {
  K12 = "K-12",
  K14 = "K-14",
  K16 = "K-16",
  L = "L",
  MS12 = "MS-12",
  Pere = "PERE",
}

export interface SpokenLanguage {
  Name: Name | null;
  NameInLanguage: Name | null;
  ISOTwoLetterCode: ISOTwoLetterCode;
}

export enum ISOTwoLetterCode {
  Empty = "",
  En = "en",
  Et = "et",
  Fr = "fr",
  Ru = "ru",
}

export enum Name {
  Eesti = "Eesti",
  Inglise = "Inglise",
  Mitmekeelne = "Mitmekeelne",
  Prantsuse = "Prantsuse",
  Vene = "Vene",
}

export enum Theatre {
  ApolloKinoSolaris = "Apollo Kino Solaris",
  ApolloKinoMustamäe = "Apollo Kino Mustamäe",
  ApolloKinoÜlemiste = "Apollo Kino Ülemiste",
  ApolloKinoCocaColaPlaza = "Apollo Kino Coca-Cola Plaza",
  ApolloKinoKristiine = "Apollo Kino Kristiine",
  ApolloKinoLõunakeskus = "Apollo Kino Lõunakeskus",
  ApolloKinoEeden = "Apollo Kino Eeden",
  ApolloKinoTasku = "Apollo Kino Tasku",
  ApolloKinoPärnu = "Apollo Kino Pärnu",
  ApolloKinoSaaremaa = "Apollo Kino Saaremaa",
  ApolloKinoAstri = "Apollo Kino Astri",
  ApolloKinoJõhvi = "Apollo Kino Jõhvi"
}

