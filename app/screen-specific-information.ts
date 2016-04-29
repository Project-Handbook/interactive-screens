// Contains all the screen specific information. Used application wide.
export class ScreenSpecificInformation {
  constructor(public title: string = "", /* Title to show in the top of the screen */
              public address: string = "", /* Address to show in the sidebar */
              public telephoneNumber: string = "", /* Telephone number in the sidebar */
              public telephone_deliveries: string = "", /* Telephone number for the delivery man */
              public postal_code: string = "", /* Postal code in the sidebar */
              public city: string = "", /* Nearest city shown in the sidebar */
              public departments: Array<string> = [], /* List of nearby departments */
              public nearest_department: string = "", /* Name of the department nearest the screen */
              public department_code: string = "", /* Department code for People tab default */
              public longitude: number = 0, /* Coordinate for the sceen */
              public latitude: number = 0) /* Coordinate for the screen  */ {}
}
