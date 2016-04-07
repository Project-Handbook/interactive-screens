import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';




class dropDownValue {
  id: number;
  name: string;
  info: string;
}
@Component({
  selector: 'contact',
  templateUrl: 'app/contact/contact.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class Contact {
  public dropDownValues: dropDownValue[] = [
        { "id": 1, "name": "Where am i?", "info": "You are at Lindstedsvägen 4" },
        { "id": 2, "name": "heee", "info": "DU kan lämna skit här" },
        { "id": 3, "name": "Whats the clock?", "info": "Tiden är 13.37" },
        { "id": 4, "name": "Where are CSC's departments located?", "info": "CSC's departments are located at Lindstedsvägen 3 & 5 and Osquars backe 18."}
      ];
      public selectedValue: dropDownValue = this.dropDownValues[0];
      onSelect(valueID) {
          this.selectedValue = null;
          for (var i = 0; i < this.dropDownValues.length; i++)
          {
            if (this.dropDownValues[i].id == valueID) {
              this.selectedValue = this.dropDownValues[i];
            }
          }
      }

}
