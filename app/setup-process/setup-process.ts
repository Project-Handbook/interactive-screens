import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';
import { NgClass } from 'angular2/common';

@Component({
  selector: 'setup-process',
  directives: [NgClass],
  templateUrl: 'app/setup-process/setup-process.html'
})
export class SetupProcess {

  public screenInfo = new ScreenSpecificInformation()

  constructor(private router: Router) {}

  // Stores the ScreenSpecificInformation object
  saveInformation() {
    if (!this.validateInputs(this.screenInfo)) { return; }
    this.screenInfo.departments = this.departments;
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

  // Input - need to add this the the list
  public newDepartment: string = ""
  // User selected department
  public selectedDepartment: string = ""
  // List of user created departments
  public departments: Array<string> = []

  addDepartment() {
    this.departments.push(this.newDepartment);
  }
}
