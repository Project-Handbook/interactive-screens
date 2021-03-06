// Contains all the screen specific information. Used application wide.
export class ScreenSpecificInformation {
  constructor(public title: string = "", /* Title to show in the top of the screen */
              public address: string = "", /* Address to show in the sidebar */
              public telephoneNumber: string = "", /* Telephone number in the sidebar */
              public telephone_deliveries: string = "", /* Telephone number for the delivery man */
              public postal_code: string = "", /* Postal code in the sidebar */
              public city: string = "", /* Nearest city shown in the sidebar */
              public departments: Array<department> = [], /* List of nearby departments */
              public nearest_department: department = {code:"",name_sv:"",address:""}, /* Name of the department nearest the screen */
              public school: school = {code:"",footer_text:"",school:""},/* Department code for People tab default */
              public department: department = {code:"",name_sv:"",address:""}, /*Department name for People tab default */
              public longitude: number = 0, /* Coordinate for the sceen */
              public latitude: number = 0, /* Coordinate for the screen  */
              // The first seven of the Date tuples will be interpreted as one opening,
              // one closing date per day in a seven day week, all other values will be ignored.
              // The dates hours and minutes are only used, all other time measure will be ignored.
              // Example) opening_hours["monday"][1] would be the closing hour on monday, and so on
              // opening_hours["thursday"][2] = false says that on thursday it's closed.
              public opening_hours: { [weekday: string]: [string, string, boolean] } = opening_hours_defaults, /* opening hours */
              public opening_hours_enabled: boolean = false, /* Whether or not the opening hours should be displayed or not */
              public calendar_polypoly_id:string="", /*Polypoly id to fetch calendar in home tab*/
              public news_feed_polypoly_id:string="", /*Polypoly id to fetch news feed in home tab*/
              public additional_delivery_info:string=""
              ) {}
}

let opening_hours_defaults: {[weekday: string]: [string , string, boolean]} =
                            { 'monday'   : ['09:00', '17:00', true],
                              'tuesday'  : ['09:00', '17:00', true],
                              'wednesday': ['09:00', '17:00', true],
                              'thursday' : ['09:00', '17:00', true],
                              'friday'   : ['09:00', '17:00', true],
                              'saturday' : ['09:00', '17:00', true],
                              'sunday'   : ['09:00', '17:00', true]};


export interface school{
  code:string,
  footer_text:string,
  school:string
}
export interface department{
  code:string,
  name_sv:string,
  address:string
}
