
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
        console.log(this.map)
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');

            // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
        this.map.on('click', 'hurricaneshelters', function(e) {
        console.log(e.features[0]);
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties;

        console.log(coordinates);
        console.log(description);
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        console.log(this.map)
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        // this.map.on('mouseenter', 'places', function() {
        // this.map.getCanvas().style.cursor = 'pointer';
        // });

        // // Change it back to a pointer when it leaves.
        // this.map.on('mouseleave', 'places', function() {
        // this.map.getCanvas().style.cursor = '';
        // });
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
