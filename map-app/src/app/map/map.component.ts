// Load dependencies
import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, Map, geoJSON } from 'leaflet';
import { HttpClient } from '@angular/common/http';

// Create component
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

// Load basemap
export class MapComponent implements OnInit {
  layers = [];
  options = {
  	layers: [
    		tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    	],
  	zoom: 6,
  	center: latLng(15.4150, -62.3710)
  };
  // Set placeholders for data overlay - not used
  uniqBldgClasses:any;
  colors: any;

// Binding HttpClient module to component
  constructor(private http: HttpClient) { }

// Process data from db - not used
  ngOnInit() {
    this.getBuildings().subscribe((buildings: any) => {
      console.log(buildings, 'buildings')
      const bldg_classes = buildings.map((b) => b.bldg_class || "Unknown");
      this.uniqBldgClasses = this.uniq(bldg_classes);
      this.colors = this.getColors(this.uniqBldgClasses)
      console.log(this.uniqBldgClasses, 'uniqBldgClasses')
      this.layers = buildings.map((b) => {

        return circle([ b.lat, b.lng ], {color: this.colors[b.bldg_class || "Unknown"], radius: 50 })
          .bindPopup(
            '<p>_id: ' + b._id + '</p>' +
            '<p>bldg_class: ' + b.bldg_class + '</p>'+
            '<p>Lat: ' + b.lat + '</p>' +
            '<p>Lng: ' + b.lng + '</p>'
          );
      });
    })

// Call geoJSON layer
    this.addGeoJsonLayer();
  }

// Use API to get buildings from db - not used
  getBuildings() {
    return this.http.get('/api/buildings');
  }

// Method to retrieve unique values of array
  uniq(a) {
    var seen = {};
    return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

// Method to generate random unique colors for n features
  getColors(uniqValues) {
    const result = {}
    uniqValues.forEach((v) => {
      result[v] = '#'+Math.floor(Math.random()*16777215).toString(16);
    })
    return result;
  }

// Method to add requested geojson layer to map
  onMapReady(map: Map) {
    this.http.get('assets/Peak_Gust_mph.geojson').subscribe((json: any) => {
        console.log(json);
        geoJSON(json).addTo(map);
    });
}

}
