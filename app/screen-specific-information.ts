// Contains all the screen specific information shown in the main-frame (border)
// of the screen.
export class ScreenSpecificInformation {
  constructor(public title: string = "", /* Title to show in the top of the screen */
              public address: string = "", /* Address to show in the sidebar */
              public telephoneNumber: string = "") /* Telephone nuber in the sidebar */ {}
}
