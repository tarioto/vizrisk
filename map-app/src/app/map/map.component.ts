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
  center = [15.3150, -61.3710];
  options = {
    layers: [
      tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: latLng(15.3150, -61.3710)
  };
  // Set placeholders for data overlay from buildings
  uniqBldgClasses: any;
  colors = {
    'Completely Destroyed': '#bf0e00',
    'Highly Damaged': '#c96900',
    'Moderately Damaged': '#c8a400',
    'Negligible to slight damage': '#8bc500',
    Unknown: '#666666'
  };
  json: any;

  // Binding HttpClient module to component
  constructor(private http: HttpClient) { }

  // Process data from db - not used
  ngOnInit() {
    this.getBuildings().subscribe((buildings: any) => {
      console.log(buildings, 'buildings');
      const bldgDamage = Object.keys(this.colors);
      this.uniqBldgClasses = this.uniq(bldgDamage);
      console.log(this.uniqBldgClasses, 'uniqBldgClasses');
      this.layers = buildings.map((b: any) => {

        return circle([b.lat, b.lng], { color: this.colors[b.main_damage || 'Unknown'], radius: 50 })
          .bindPopup(
            '<p>_id: ' + b._id + '</p>' +
            '<p>Class: ' + b.main_damage + '</p>' +
            '<p>Lat: ' + b.lat + '</p>' +
            '<p>Lng: ' + b.lng + '</p>'
          );
      });
    });

    this.http.get('assets/Peak_Gust_mph.geojson').subscribe((json: any) => {
      this.json = json;
    });
  }

  // Use API to get buildings from db - not used
  getBuildings() {
    return this.http.get('/api/buildings');
  }

  // Method to retrieve unique values of array
  uniq(a) {
    const seen = {};
    return a.filter((item) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  // Method to add requested geojson layer to map
  onMapReady(map: Map) {
    this.http.get('assets/Peak_Gust_mph.geojson').subscribe((json: any) => {
      console.log(json);
      this.json = json;
      geoJSON(json, {
        style: (feature) => {
          switch (feature.properties.Name) {
            case '40': return { color: '#00d4e5' , opacity: 0.0, fillOpacity: 0.05};
            case '50': return { color: '#00d4e5' , opacity: 0.0, fillOpacity: 0.05};
            case '60': return { color: '#00e1ba' , opacity: 0.0, fillOpacity: 0.05};
            case '70': return { color: '#00e1ba' , opacity: 0.0, fillOpacity: 0.05};
            case '80': return { color: '#00de7f' , opacity: 0.0, fillOpacity: 0.05};
            case '90': return { color: '#00db0f' , opacity: 0.0, fillOpacity: 0.05};
            case '100': return { color: '#25d500' , opacity: 0.0, fillOpacity: 0.05};
            case '110': return { color: '#59d200' , opacity: 0.0, fillOpacity: 0.05};
            case '120': return { color: '#8bce00' , opacity: 0.0, fillOpacity: 0.05};
            case '130': return { color: '#bccb00' , opacity: 0.0, fillOpacity: 0.05};
            case '140': return { color: '#c8a500' , opacity: 0.0, fillOpacity: 0.05};
            case '150': return { color: '#c46900' , opacity: 0.0, fillOpacity: 0.05};
            case '160': return { color: '#c46900' , opacity: 0.0, fillOpacity: 0.05};
            case '170': return { color: '#c13a00' , opacity: 0.0, fillOpacity: 0.05};
            case '180': return { color: '#c13a00' , opacity: 0.0, fillOpacity: 0.05};
            case '190': return { color: '#bf0e00' , opacity: 0.0, fillOpacity: 0.05};
            case '200': return { color: '#bf0e00' , opacity: 0.0, fillOpacity: 0.05};
          }
        }
      }).addTo(map);
    });
  }

}
