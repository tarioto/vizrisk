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
      title: 'Imagine 90% of your country\'s buildings being damaged or destroyed in one night...',
      info: 'This was the impact of Hurricane Maria on the island nation of Dominica on September 18, 2017.\n Despite contributing the least to climate change, Caribbean countries like Dominica are among the nations hardest hit by its effects. The 2017 Atlantic hurricane season, whose strongest storm was Maria, incurred more damage than any tropical cyclone season in recorded history. Climate experts have noted a heightened pattern of cyclonic activity since the mid-90s, as well as a southward trend in hurricane tracks towards the Lesser Antilles islands, which include Dominica.',
      visableLayer: 'peak-gust-mph'
    },
    {
      title: 'In 2017, Hurricane Maria became the first recorded Category 5 storm to hit the island of Dominica....',
      info: 'In addition to Dominica, Maria dealt severe damage to the islands of St. Croix and Puerto Rico, making it the third costliest hurricane in the history of the United States.',
      visableLayer: ''
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
      visableLayer: 'roads'
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
      id: 'roads',
      displayName: 'Dominican Roads',
      checked: false
    }, {
      id: 'dominica-coast',
      displayName: 'Dominican Coastline',
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
