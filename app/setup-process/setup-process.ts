import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';

@Component({
  selector: 'setup-process',
  templateUrl: 'app/setup-process/setup-process.html'
})
export class SetupProcess {

  public screenInfo = new ScreenSpecificInformation()

  constructor(private router: Router) {}

  // Stores the ScreenSpecificInformation object
  saveInformation() {
    if (!this.validateInputs(this.screenInfo)) { return; }
    // Save the screen information in the session storage for use by all of the app
    localStorage.setItem(Constants.SETUP_PROCESS_KEY, JSON.stringify(this.screenInfo));
    this.router.navigate(['Home']);
  }

  // Reads the stored ScreenSpecificInformation object
  loadInformation() {
    this.screenInfo = <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
  }

  // Validates that all the required fields in the setup process contain data
  private validateInputs(screenInfo: ScreenSpecificInformation): boolean {
    // TODO: Implement
    return true
  }
}
