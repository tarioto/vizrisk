
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {FormControl} from '@angular/forms';


// Create component
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/awilson1233/cjxw7tpgd0dpt1co3upnhcxg4';
  lat = 15.4250;
  lng = -61.3710;

  isChecked = false;


  toggleableLayerIds = new FormControl();
  toggleableLayerIdsList = [
    {
    id: 'storm-track-8xi3zk',
    displayName: 'Storm Track'
    }, {
    id: 'peak_gusts_mph',
    displayName: 'Peak Gusts (mph)'
    }, {
    id: 'dominica-population',
    displayName: 'Population'
    }, {
    id: 'hurricaneshelters',
    displayName: 'Hurricane Shelters'
    }, {
    id: 'redcross-damageneedsassessment',
    displayName: 'Damage Needs Assessment (Red Cross)'
    }, {
    id: 'wind-hazards',
    displayName: 'Wind Hazards'
    }, {
    id: 'dominica-damage-buildings',
    displayName: 'Damaged Buildings (zoom to view)'
    }];

  constructor() { }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    console.log(this.map);

    this.map.on('load', () => {
      this.toggleableLayerIdsList.forEach(( layer) => {
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
    });

  }

  toggleLayer(layer: any) {
    if (this.map.getLayoutProperty(layer, 'visibility') === 'visible') {
      this.map.setLayoutProperty(layer, 'visibility', 'none');
    } else {
      this.map.setLayoutProperty(layer, 'visibility', 'visible');
    }
  }

}
