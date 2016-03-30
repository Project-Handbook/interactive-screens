import { Component } from 'angular2/core';
import {MapService} from './map-service';
@Component({
  selector: 'map',
  template: '<h1>Map component here</h1>',
  providers:[MapService],
})
export class Map {

}
