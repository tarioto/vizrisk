import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/awilson1233/cjy3dg55f2kxh1covpds8dnh5';
  lat = 15.4250;
  lng = -61.3710;
  layers: any;
  currentSceneIndex = 0;
  scenes = [
    {
      title: 'Here is some big headline statement....',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      visableLayer: 'storm-track-8xi3zk'
    },
    {
      title: 'second one',
      info: 'this will be a description of some stuff or whatever',
      visableLayer: 'hurricaneshelters'
    },
    {
      title: '3',
      info: 'okay okay okay',
      visableLayer: 'building-data-9b0ub5'
    }
  ];

  isChecked = false;


  toggleableLayerIds = new FormControl();
  toggleableLayerIdsList = [
    {
      id: 'storm-track-8xi3zk',
      displayName: 'Storm Track',
      checked: false
    }, {
      id: 'peak-gust-mph',
      displayName: 'Peak Gusts (mph)',
      checked: false,
    }, {
      id: 'dominica-population',
      displayName: 'Population',
      checked: false
    }, {
      id: 'hurricaneshelters',
      displayName: 'Hurricane Shelters',
      checked: false
    }, {
      id: 'redcross-damageneedsassessment',
      displayName: 'Damage Needs Assessment (Red Cross)',
      checked: false
    }, {
      id: 'wind-hazards',
      displayName: 'Wind Hazards',
      checked: false
    }, {
      id: 'building-data-9b0ub5',
      displayName: 'Damaged Buildings',
      checked: false
    }];

  constructor() { }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      minZoom: 10,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    console.log(this.map);

    this.map.on('load', () => {
      this.toggleableLayerIdsList.forEach(( layer) => {
        console.log(this.map);
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
    });

    this.map.on('click', 'dominica-damage-buildings', (e) => {
      console.log(e.features[0]);
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.agency_id)
      .addTo(this.map);
      });
  }

  toggleLayer(layer: any) {
    if (this.map.getLayoutProperty(layer, 'visibility') === 'visible') {
      this.map.setLayoutProperty(layer, 'visibility', 'none');
    } else {
      this.map.setLayoutProperty(layer, 'visibility', 'visible');
      console.log(this.toggleableLayerIdsList)
      this.toggleableLayerIdsList[layer].checked = true;
    }
  }

  changeScene(direction) {
    if (direction === 'next') {
      if (this.currentSceneIndex < this.scenes.length - 1) {
        this.currentSceneIndex += 1;
        this.setCurrentLayer();
      }
    } else {
      if (this.currentSceneIndex !== 0) {
        this.currentSceneIndex -= 1;
        this.setCurrentLayer();
      }
    }
  }

  setCurrentLayer() {
    this.toggleableLayerIdsList.forEach(( layer) => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
    this.toggleLayer(this.scenes[this.currentSceneIndex].visableLayer);
    this.isChecked
  }

  displayScene(type: any) {
    return this.scenes[this.currentSceneIndex][type];
  }

}
