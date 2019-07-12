
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

// Create component
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/awilson1233/cjxw7tpgd0dpt1co3upnhcxg4';
  lat = 15.3150;
  lng = -61.3710;

  constructor() { }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 9,
      center: [this.lng, this.lat]
    });

    console.log(this.map);
  }

}
