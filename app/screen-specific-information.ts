// Contains all the screen specific information shown in the main-frame (border)
// of the screen.
export class ScreenSpecificInformation {
  constructor(public title: string = "", /* Title to show in the top of the screen */
              public address: string = "", /* Address to show in the sidebar */
              public telephoneNumber: string = "", /* Telephone nuber in the sidebar */
              public postal_code: string = "", /* Postal code in the sidebar */
              public city: string = "", /* Nearest city shown in the sidebar */
              public departments: Array<string> = [], /* List of nearby departments */
              public nearest_department: string = "") /*  */ {}
}
