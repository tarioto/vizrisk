
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
  lat = 15.3150;
  lng = -61.3710;

  isChecked = true;


  toggleableLayerIds = new FormControl();
  toggleableLayerIdsList = [
    'dominica-damage-buildings',
    'dominica-population',
    'hurricaneshelters',
    'peak_gusts_mph',
    'redcross-damageneedsassessment',
    'storm-track-8xi3zk',
    'wind-hazards'
  ];

  constructor() { }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 9,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    console.log(this.map);

    this.map.on('load', this.onLoad);


    //   for (let i = 0; i < toggleableLayerIds.length; i++) {
    //     const id = toggleableLayerIds[i];

    //     const link = document.createElement('a');
    //     link.href = '#';
    //     link.className = 'active';
    //     link.textContent = id;

    //     link.onclick = function(e) {
    //     const clickedLayer = this.textContent;
    //     console.log(clickedLayer);
    //     e.preventDefault();
    //     e.stopPropagation();

    //     const visibility = this.map.getLayoutProperty(clickedLayer, 'visibility');

    //     if (visibility === 'visible') {
    //       this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //       this.className = '';
    //     } else {
    //       this.className = 'active';
    //       this.map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    //     }
    //   };

    //     const layers = document.getElementById('menu');
    //     layers.appendChild(link);
    //   }
    // });

    // for (let i = 0; i < toggleableLayerIds.length; i++) {
    //   const id = toggleableLayerIds[i];

    //   const link = document.createElement('a');
    //   link.href = '#';
    //   link.className = 'active';
    //   link.textContent = id;

    //   link.onclick = function(e) {
    //   const clickedLayer = this.textContent;
    //   console.log(clickedLayer);
    //   e.preventDefault();
    //   e.stopPropagation();

    //   const visibility = this.map.getLayoutProperty(clickedLayer, 'visibility');

    //   if (visibility === 'visible') {
    //     this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //     this.className = '';
    //   } else {
    //     this.className = 'active';
    //     this.map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    //   }
    // };
  }

  onLoad() {
    this.toggleLayer()
  }

   toggleLayer(layer) {
      this.map.on('load', () => {
      this.map.getLayoutProperty(layer, 'visibility');
      this.map.setLayoutProperty(layer, 'visibility', 'none');
    });
  }

}
