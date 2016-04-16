// Contains application wide constants
export class Constants {
  // Constant key for the ScreenSpecificInformation object in sessionStorage
  public static get SETUP_PROCESS_KEY(): string { return "ScreenSpecificInformation"; }
}

// All KTH schools and there shorthand notation coupled with their name.
export class School {
  // School constants
  static ABE = "SKOLAN FÖR ARKITEKTUR OCH SAMHÄLLSBYGGNAD";
  static BIO = "SKOLAN FÖR BIOTEKNOLOGI";
  static CSC = "SKOLAN FÖR DATAVETENSKAP OCH KOMMUNIKATION";
  static EES = "SKOLAN FÖR ELEKTRO OCH SYSTEMTEKNIK";
  static ITM = "SKOLAN FÖR INDUSTRIELL TEKNIK OCH MANAGEMENT";
  static ICT = "SKOLAN FÖR INFORMATIONS- OCH KOMMUNIKATIONSTEKNIK";
  static CHE = "SKOLAN FÖR KEMIVETENSKAP";
  static STH = "SKOLAN FÖR TEKNIK OCH HÄLSA";
  static SCI = "SKOLAN FÖR TEKNIKVETENSKAP";
  static ECE = "SKOLAN FÖR TEKNIKVETENSKAPLIG KOMMUNIKATION O LÄRANDE";
}
