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
    zoom: 12,
    center: latLng(15.3150, -61.3710)
  };
  // Set placeholders for data overlay from buildings
  uniqBldgClasses: any;
  uniqLocPerc: any;
  colors = {
    'Completely Destroyed': "#bf0e00",
    'Highly Damaged': "#c96900",
    'Moderately Damaged': "#c8a400",
    'Negligible to slight damage': "#8bc500",
    'Unknown': "#666666"

  };
  colorsLoc = {
    1.09: "#bf0e00",
    1.07: "#c96900",
    1.05: "#c8a400",
    1.04: "#8bc500",
    1.0: "#666666",
    0.99: "#666666",
    0.97: "#666666",
    0.96: "#666666"

  };

  // Binding HttpClient module to component
  constructor(private http: HttpClient) { }

  // // Process data from db
  // ngOnInit() {
  //   this.getBuildings().subscribe((buildings: any) => {
  //     console.log(buildings, 'buildings')
  //     const bldg_damage = Object.keys(this.colors);
  //     this.uniqBldgClasses = this.uniq(bldg_damage);
  //     console.log(this.uniqBldgClasses, 'uniqBldgClasses')
  //     this.layers = buildings.map((b) => {
  //
  //       return circle([b.lat, b.lng], { color: this.colors[b.main_damage || "Unknown"], radius: 50 })
  //         .bindPopup(
  //           '<p>_id: ' + b._id + '</p>' +
  //           '<p>Class: ' + b.main_damage + '</p>' +
  //           '<p>Lat: ' + b.lat + '</p>' +
  //           '<p>Lng: ' + b.lng + '</p>'
  //         );
  //     });
  //   })
  // }
  //
  // // Use API to get buildings from db - not used
  // getBuildings() {
  //   return this.http.get('/api/buildings');
  // }

  // Process data from db
  ngOnInit() {
    this.getLocations().subscribe((locations: any) => {
      console.log(locations, 'locations')
      const loc_perc = Object.keys(this.colorsLoc);
      this.uniqLocPerc = this.uniq(loc_perc);
      console.log(this.uniqLocPerc, 'uniqLocPerc')
      this.layers = locations.map((b) => {

        return circle([b.lat, b.lng], { color: this.colorsLoc[b.perc_increase], radius: 50 })
          .bindPopup(
            '<p>_id: ' + b._id + '</p>' +
            '<p>Increase: ' + b.perc_increase + '</p>' +
            '<p>Lat: ' + b.lat + '</p>' +
            '<p>Lng: ' + b.lng + '</p>'
          );
      });
    })
  }

  // Use API to get buildings from db - not used
  getLocations() {
    return this.http.get('/api/locations');
  }

  // Method to retrieve unique values of array
  uniq(a) {
    var seen = {};
    return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  // Method to add requested geojson layer to map
  onMapReady(map: Map) {
    this.http.get('assets/Peak_Gust_mph.geojson').subscribe((json: any) => {
      console.log(json);
      geoJSON(json, {
        style: function(feature) {
          switch (feature.properties.Name) {
            case '40': return { color: "#00d4e5" , opacity: 0.0, fillOpacity: 0.05};
            case '50': return { color: "#00d4e5" , opacity: 0.0, fillOpacity: 0.05};
            case '60': return { color: "#00e1ba" , opacity: 0.0, fillOpacity: 0.05};
            case '70': return { color: "#00e1ba" , opacity: 0.0, fillOpacity: 0.05};
            case '80': return { color: "#00de7f" , opacity: 0.0, fillOpacity: 0.05};
            case '90': return { color: "#00db0f" , opacity: 0.0, fillOpacity: 0.05};
            case '100': return { color: "#25d500" , opacity: 0.0, fillOpacity: 0.05};
            case '110': return { color: "#59d200" , opacity: 0.0, fillOpacity: 0.05};
            case '120': return { color: "#8bce00" , opacity: 0.0, fillOpacity: 0.05};
            case '130': return { color: "#bccb00" , opacity: 0.0, fillOpacity: 0.05};
            case '140': return { color: "#c8a500" , opacity: 0.0, fillOpacity: 0.05};
            case '150': return { color: "#c46900" , opacity: 0.0, fillOpacity: 0.05};
            case '160': return { color: "#c46900" , opacity: 0.0, fillOpacity: 0.05};
            case '170': return { color: "#c13a00" , opacity: 0.0, fillOpacity: 0.05};
            case '180': return { color: "#c13a00" , opacity: 0.0, fillOpacity: 0.05};
            case '190': return { color: "#bf0e00" , opacity: 0.0, fillOpacity: 0.05};
            case '200': return { color: "#bf0e00" , opacity: 0.0, fillOpacity: 0.05};
          }
        }
      }).addTo(map);
    });
  }

}
