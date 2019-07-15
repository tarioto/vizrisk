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
      info: `This was the impact of Hurricane Maria on the island nation of Dominica on September 18, 2017.\n \n
      Despite contributing the least to climate change, Caribbean countries like Dominica are among the nations hardest hit by its effects. The 2017 Atlantic hurricane season, whose strongest storm was Maria, incurred more damage than any tropical cyclone season in recorded history. Climate experts have noted a heightened pattern of cyclonic activity since the mid-90s, as well as a southward trend in hurricane tracks towards the Lesser Antilles islands, which include Dominica.`,
      visibleLayer: ''
    },
    {
      title: 'In 2017, Hurricane Maria became the first recorded Category 5 storm to hit the island of Dominica....',
      info: `In addition to Dominica, Maria dealt severe damage to the islands of St. Croix and Puerto Rico, making it the third costliest hurricane in the history of the United States. Maria had a peak intensity of more than 172 mph, and was at about 166 mph when it made landfall on Dominica. But Maria also had a rapid increase in intensity during its duration of almost 75 mph within 24 hours, the sixth-fastest hurricane intensification ever in the Atlantic basin. \n \n
        In addition to severe winds, Maria brought 22.8 inches of rain to Dominica, and brought about at least 31 deaths and 34 missing persons. In the wake of the hurricane, total damages for the island were estimated to be on the order of $1.3 billion. \n \n
        The map shows the intensity of Maria’s winds across the Caribbean. While Maria’s intensity weakened as the storm moved further northwest, damage continued to be devastating. `,
      visibleLayer: 'peak-gust-mph'
    },
    {
      title: 'Here is a headline about impact on Dominica from Hurricane Maria...',
      info: 'this will be a description of some stuff or whatever',
      visibleLayer: 'hurricaneshelters'
    },
    {
      title: 'Here is a headline about building damage in Dominica...',
      info: 'this will be a description of some stuff or whatever',
      visibleLayer: 'building-data-9b0ub5'
    },
    {
      title: 'Here is a headline about building damage in Roseau...',
      info: 'this will be a description of some stuff or whatever',
      visibleLayer: 'building-data-9b0ub5'
    },
    {
      title: 'Dominica and other Caribbean countries will continue to experience hurricanes in the future...',
      info: `While Dominica is recovering from Hurricane Maria, the country also needs to be look forwarding and fortifying itself against future hurricane seasons.\n \n
      The map (CREDIT SOURCE) shows an overview of the degree of windstorm susceptibility across the island. With climate change, the frequency and intensity of storms is expected to change, and worsen, for Dominica and its neighboring Lower Antilles islands.`,
      visibleLayer: 'wind-hazards'
    },
    {
      title: 'Fortunately, Dominica is thinking pro-actively about how they can better mitigate risks in the next hurricane...',
      info: `Thus, Dominica needs to incorporate resilient strategies into their recovery. As part of this effort they are pursuing various strategies, such as: \n \n
      - Nature based solutions. Coral reefs and mangroves can absorb 98% of the wave energy from an incoming storm. One of the most efficient ways to accomplish this is to plant more trees to prevent erosion. [need reference] \n
      - Investing in infrastructure. One of the recommendations from the PDNA is to significantly invest in improving infrastructure. Improving roads and transportation networks can improve post-disaster relief efforts & access to temporary shelters. \n
      - Improving building codes and construction practices. One of the other targeted areas for investment is housing, as this sector accounted for a third of damage sustained during the hurricane. Dominica is already working on improving its building codes; one of the proposed improvements is to have steeper roof angles & to use screws instead of nails to strengthen frames. [need ref]`,
      visibleLayer: 'roads'
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
    this.toggleLayer(this.scenes[this.currentSceneIndex].visibleLayer);
  }

  displayScene(type: any) {
    return this.scenes[this.currentSceneIndex][type];
  }

}
