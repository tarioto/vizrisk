import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { FormControl } from '@angular/forms';


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
      title: 'Here is a headline about hurricanes in the Caribbean...',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      visableLayer: ''
    },
    {
      title: 'Here is a headline about Hurricane Maria...',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      visableLayer: 'peak-gust-mph'
    },
    {
      title: 'Here is a headline about impact on Dominica from Hurricane Maria...',
      info: 'this will be a description of some stuff or whatever',
      visableLayer: 'hurricaneshelters'
    },
    {
      title: 'Here is a headline about building damage in Dominica...',
      info: 'this will be a description of some stuff or whatever',
      visableLayer: 'building-data-9b0ub5'
    },
    {
      title: 'Here is a headline about building damage in Roseau...',
      info: 'this will be a description of some stuff or whatever',
      visableLayer: 'building-data-9b0ub5'
    },
    {
      title: 'Here is a headline about wind hazard in Dominica...',
      info: 'this will be a description of some stuff or whatever',
      visableLayer: 'wind-hazards'
    },
    {
      title: 'Here is a headline about mitigation measures...',
      info: 'okay okay okay',
      visableLayer: ''
    }
  ];

  nextDisabled = false;
  prevDisabled = true;

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
      minZoom: 6,
      center: [this.lng, this.lat]
    });

    console.log(this.map);

    this.map.on('load', () => {
      this.toggleableLayerIdsList.forEach((layer) => {
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
    }
  }

  changeScene(direction) {
    if (direction === 'next') {
      this.prevDisabled = false;
      if (this.currentSceneIndex < this.scenes.length - 1) {
        this.currentSceneIndex += 1;
        this.setCurrentLayer();
        if (this.currentSceneIndex === this.scenes.length - 1) {
          this.nextDisabled = true;
        } else {
          this.nextDisabled = false;
        }
      }
    } else {
      if (this.currentSceneIndex !== 0) {
        this.nextDisabled = false;
        this.currentSceneIndex -= 1;
        this.setCurrentLayer();
        if (this.currentSceneIndex > 0) {
          this.prevDisabled = false;
        } else if (this.currentSceneIndex === 0) {
          console.log(this.currentSceneIndex)
          this.prevDisabled = true;
        }
      }
    }
  }

  setCurrentLayer() {
    this.toggleableLayerIdsList.forEach((layer) => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
    this.toggleLayer(this.scenes[this.currentSceneIndex].visableLayer);
  }

  displayScene(type: any) {
    return this.scenes[this.currentSceneIndex][type];
  }

}
