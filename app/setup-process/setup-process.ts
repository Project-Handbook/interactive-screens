import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';

@Component({
  selector: 'setup-process',
  templateUrl: 'app/setup-process/setup-process.html'
})
export class SetupProcess {
  // Title of the screen
  public title: string

  // Address of the screen
  public address: string

  // Telephone number
  public telephoneNumber: string

  constructor(private router: Router) {}

  submitInformation() {
    if (!this.validateInputs()) { return; }
    // Gather input
    console.log(this.title, this.address, this.telephoneNumber);
    var screenInfo = new ScreenSpecificInformation(this.title,
                                                   this.address,
                                                   this.telephoneNumber);
    // Save the screen information in the session storage for use by all of the app
    sessionStorage.setItem(Constants.SETUP_PROCESS_KEY, JSON.stringify(screenInfo));
    this.router.navigate(['Home']);
  }

  // Validates that all the required fields in the setup process contain data
  validateInputs(): boolean {
    // TODO: Implement
    return true
  }
}
