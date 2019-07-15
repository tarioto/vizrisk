import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'column'
    }],
    chart: {
      style: {
        fontFamily: 'Helvetica Neue'
      }
    }
  };
  map: mapboxgl.Map;
  style = 'mapbox://styles/awilson1233/cjy3dg55f2kxh1covpds8dnh5';
  lat = 19.232773;
  lng = -71.967749;
  layers: any;
  currentSceneIndex = 0;
  scenes = [
    {
      title: 'Imagine 90% of your country\'s buildings being damaged or destroyed in one night... TEST',
      info: `This was the impact of Hurricane Maria on the island nation of Dominica on September 18, 2017.\n
      Despite contributing the least to climate change, Caribbean countries like Dominica are among the nations
      hardest hit by its effects. The 2017 Atlantic hurricane season, whose strongest storm was Maria, incurred
      more damage than any tropical cyclone season in recorded history. Climate experts have noted a heightened
      pattern of cyclonic activity since the mid-90s, as well as a southward trend in hurricane tracks towards
      the Lesser Antilles islands, which include Dominica.`,
      attribution: [{
        link: 'https://www.nytimes.com/2018/03/19/travel/dominica-hurricane-maria-recovery.html',
        label: `"After Maria’s Devastation, Can Dominica Be a Destination Again?" Matt Gross. New York Times.
        March 19, 2018. Retrieved July 14, 2019.`
      },
      {
        link: 'https://www.ncdc.noaa.gov/ibtracs/index.php?name=ibtracs-data',
        label: 'CITATION PENDING FOR 1960-PRESENT HURRICANES'
      },
      {
        link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
        label: `"Update on National Hurricane Center Products and Services for 2017" (PDF). National Hurricane
        Center. May 23, 2017. Retrieved June 21, 2019.`
      }],
      visibleLayer: ['dominica-coast'],
      zoom: 4.5,
      center: { lon: -71.967749, lat: 19.232773 },
      chart: {
        exists: true,
        chartOptions: {
          series: [
            {
              data: [4, 6, 5, 2],
              name: 'Category 1',
              type: 'column',
              color: 'dodgerblue',
              borderWidth: 0,
            },
            {
              data: [2, 3, 3, 5],
              name: 'Category 2',
              type: 'column',
              color: 'mediumseagreen',
              borderWidth: 0,
            },
            {
              data: [1, 3, 3, 4],
              name: 'Category 3',
              type: 'column',
              color: 'gold',
              borderWidth: 0,
            },
            {
              data: [2, 4, 7, 0],
              name: 'Category 4',
              type: 'column',
              color: 'darkorange',
              borderWidth: 0,
            },
            {
              data: [1, 3, 5, 3],
              name: 'Category 5',
              type: 'column',
              color: 'crimson',
              borderWidth: 0,
            }
          ],
          chart: {
            style: {
              fontFamily: 'Helvetica Neue'
            }
          },
          title: {
            text: 'Hurricane intensity and frequency since 1960'
          },
          legend: {
            enabled: true
          },
          xAxis: {
            categories: ['1960 - 1979', '1980 - 1999', '2000 - 2009', '2010 - 2019'],
            labels: {
              style: {
                fontSize: '16px'
              }
            }
          },
          yAxis: {
            title: {
              text: false
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal'
            }
          }
        }
      },
      table: {
        exists: true,
        data: [[]]
      },
      legend: {
        exists: false,
        // colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        // labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    {
      title: 'In 2017, Hurricane Maria became the first recorded Category 5 storm to hit the island of Dominica....',
      info: `In addition to Dominica, Maria dealt severe damage to the islands of St. Croix and Puerto Rico, making
      it the third costliest hurricane in the history of the United States. Maria had a peak intensity of more than
      172 mph, and was at about 166 mph when it made landfall on Dominica. But Maria also had a rapid increase in
      intensity during its duration of almost 75 mph within 24 hours, the sixth-fastest hurricane intensification
      ever in the Atlantic basin. \n
        In addition to severe winds, Maria brought 22.8 inches of rain to Dominica, and brought about at least 31
        deaths and 34 missing persons. In the wake of the hurricane, total damages for the island were estimated
        to be on the order of $1.3 billion. \n
        The map shows the intensity of Maria’s winds across the Caribbean. While Maria’s intensity weakened as the
        storm moved further northwest, damage continued to be devastating.`,
      attribution: [
        {
          link: 'https://www.nhc.noaa.gov/data/tcr/AL152017_Maria.pdf',
          label: 'National Hurricane Center Tropical Cyclone Report: Hurricane Maria. NOAA. 2017.'
        },
        {
          link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
          label: 'Prevatt, David & Dupigny-Giroux, L-A & Masters, Forrest. (2010). Engineering Perspectives on Reducing Hurricane Damage to Housing in CARICOM Caribbean Islands. Natural Hazards Review. 11. 140-150. 10.1061/(ASCE)NH.1527-6996.0000017.'
        }],
      visibleLayer: ['peak-gust-mph'],
      zoom: 5.5,
      center: { lon: -63.509315, lat: 17.608075 },
      chart: {
        exists: false
      },
      legend: {
        exists: false,
        colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    {
      title: 'In 2017, Hurricane Maria became the first recorded Category 5 storm to hit the island of Dominica....',
      info: `In addition to Dominica, Maria dealt severe damage to the islands of St. Croix and Puerto Rico, making it the third costliest hurricane in the history of the United States. Maria had a peak intensity of more than 172 mph, and was at about 166 mph when it made landfall on Dominica. But Maria also had a rapid increase in intensity during its duration of almost 75 mph within 24 hours, the sixth-fastest hurricane intensification ever in the Atlantic basin. \n
        In addition to severe winds, Maria brought 22.8 inches of rain to Dominica, and brought about at least 31 deaths and 34 missing persons. In the wake of the hurricane, total damages for the island were estimated to be on the order of $1.3 billion. \n
        The map shows the intensity of Maria’s winds across the Caribbean. While Maria’s intensity weakened as the storm moved further northwest, damage continued to be devastating.`,
      attribution: [
      {
        link: 'https://www.nhc.noaa.gov/data/tcr/AL152017_Maria.pdf',
        label: 'National Hurricane Center Tropical Cyclone Report: Hurricane Maria. NOAA. 2017.'
      },
      {
        link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
        label: 'Prevatt, David & Dupigny-Giroux, L-A & Masters, Forrest. (2010). Engineering Perspectives on Reducing Hurricane Damage to Housing in CARICOM Caribbean Islands. Natural Hazards Review. 11. 140-150. 10.1061/(ASCE)NH.1527-6996.0000017.'
      }],
      visibleLayer: ['displaced-pop2'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      chart: {
        exists: false
      },
      legend: {
        exists: true,
        colors: ['#ea7b4300'],
        labels: ['Total number of IDP individuals']
      }
    },
    // {
    //   title: 'Here is a headline about impact on Dominica from Hurricane Maria...',
    //   info: 'this will be a description of some stuff or whatever',
    // attribution: [{
    //   link: '',
    //   label: ''
    // }],
    //   visibleLayer: 'hurricaneshelters',
    //   zoom: 10.5,
    //   center: {lon: -61.351322, lat: 15.428929}
    // },
    {
      title: 'Over 90% of the country\'s housing stock was damaged...',
      info: 'The chart below shows that a significant proportion of the damaged buildings were highly damaged or completely destroyed. The widespread damage left thousdands of people homeless. As the map shows, the coastlines are much more vulnerable to hurricane damage with a particularly high concentration of severely damaged housing stock on the east coast of Dominica. \n \n It is estimated that total damage to the housing sector alone is nearly US$360 million. In addition, losses resulting from this damage are estimated at US$29 million, which includes loss of rental income, demolition costs, debris removal and clean up, and shelter costs. \n \n In the GFDRR\'s proposed budget for recovery, a total of US$520 million is dedicated to housing. The group recommends that much of this budget be spent in the medium-term following the hurricane, which is in years 2019-2022. \n \n Rebuilding residential buildings using stricter building codes and connecting the most vulnerable communities through improved infrastructure can enable more efficient recovery and resilience in future hurricanes.',
      attribution: [{
        link: 'https://www.gfdrr.org/en/dominica-pdna-hurricanemaria',
        label: 'Dominica: Post-Disaster Needs Assessment following Hurricane Maria. GFDRR. 2018'
      }],
      visibleLayer: ['building-data-9b0ub5'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      chart: {
        exists: true,
        chartOptions: {
          series: [{
            data: [{ y: 294, color: 'mediumseagreen' }, { y: 966, color: 'gold' }, { y: 1300, color: 'darkorange' }, { y: 381, color: 'crimson' }],
            type: 'column',
            borderWidth: 0,
            plotOptions: {
              column: {
                colorByPoint: true
              }
            },
          }],
          chart: {
            style: {
              fontFamily: 'Helvetica Neue'
            }
          },
          title: {
            text: "Number of damaged Dominica buildings in Hurricane Maria"
          },
          legend: {
            enabled: false
          },
          xAxis: {
            categories: ["Negligible to slight damage", "Moderately damaged", "Highly damaged", "Completely destroyed"],
            labels: {
              style: {
                fontSize: '16px'
              }
            }
          },
          yAxis: {
            title: {
              text: false
            }
          }
        }
      },
      legend: {
        exists: true,
        colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    {
      title: 'In Roseau, the capital city of Dominica...',
      info: 'A large proportion of the buildings were either moderately or highly damaged. Much of the island nation\'s businesses, hotels, and commerce is located in Roseau.',
      attribution: [{
        link: '',
        label: ''
      }],
      visibleLayer: ['building-data-9b0ub5'],
      zoom: 14.5,
      center: { lon: -61.377716, lat: 15.308563 },
      chart: {
        exists: false
      },
      legend: {
        exists: true,
        colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    {
      title: 'Dominica and other Caribbean countries will continue to experience hurricanes in the future...',
      info: `While Dominica is recovering from Hurricane Maria, the country also needs to be look forwarding and fortifying itself against future hurricane seasons.\n
      The map shows an overview of the degree of windstorm susceptibility across the island (USAID 2006). With climate change, the frequency and intensity of storms is expected to change, and worsen, for Dominica and its neighboring Lower Antilles islands*.`,
      attribution: [{
        link: 'http://charim-geonode.net/layers/geonode:wind_5c',
        label: 'This wind hazard map was produced in 2006 as part of a USAID-funded project'
      },
      {
        link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
        label: '*Prevatt, David & Dupigny-Giroux, L-A & Masters, Forrest. (2010). Engineering Perspectives on Reducing Hurricane Damage to Housing in CARICOM Caribbean Islands. Natural Hazards Review. 11. 140-150. 10.1061/(ASCE)NH.1527-6996.0000017.'
      }],
      visibleLayer: ['wind-hazards'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      chart: {
        exists: false
      },
      legend: {
        exists: true,
        colors: ['#ADCBFF', '#94BDFF', '#7AABFF', '#669EFF', '#4287FF'],
        labels: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
      }
    },
    {
      title: 'Fortunately, Dominica is thinking pro-actively about how they can better mitigate risks in the next hurricane...',
      info: `Thus, Dominica needs to incorporate resilient strategies into their recovery. As part of this effort they are pursuing various strategies, such as: \n \n
      - Nature based solutions. Coral reefs and mangroves can absorb 98% of the wave energy from an incoming storm. One of the most efficient ways to accomplish this is to plant more trees to prevent erosion. [need reference] \n
      - Investing in infrastructure. One of the recommendations from the PDNA is to significantly invest in improving infrastructure. Improving roads and transportation networks can improve post-disaster relief efforts & access to temporary shelters. \n
      - Improving building codes and construction practices. One of the other targeted areas for investment is housing, as this sector accounted for a third of damage sustained during the hurricane. Dominica is already working on improving its building codes; one of the proposed improvements is to have steeper roof angles & to use screws instead of nails to strengthen frames. [need ref]`,
      attribution: [{
        link: 'https://www.bloomberg.com/news/articles/2018-05-10/dominica-plans-to-be-the-world-s-first-climate-resilient-country',
        label: '"The Quest to Hurricane-Proof and Island". Nikki Ekstein. Bloomberg. May 10, 2018. Retrieved June 23, 2019.'
      }],
      visibleLayer: ['dominica-coast-blue', 'hurricaneshelters', 'roads'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      chart: {
        exists: false
      },
      legend: {
        exists: false,
        colors: ['#ADCBFF', '#94BDFF', '#7AABFF', '#669EFF', '#4287FF'],
        labels: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
      }
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
      id: 'redcross-damageneedsassessment',
      displayName: 'Damage Needs Assessment (Red Cross)',
      checked: false
    }, {
      id: 'dominica-coast',
      displayName: 'Dominican Coastline',
      checked: false
    }, {
      id: 'dominica-coast-blue',
      displayName: 'Dominican Coastline',
      checked: false
    }, {
      id: 'wind-hazards',
      displayName: 'Wind Hazards',
      checked: false
    }, {
      id: 'displaced-pop2',
      displayName: 'Displaced Population',
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
      zoom: 4.5,
      // minZoom: 4,
      center: [this.lng, this.lat]
    });

    console.log(this.map);

    this.map.on('load', () => {
      this.toggleableLayerIdsList.forEach((layer) => {
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
      this.map.setLayoutProperty('dominica-coast', 'visibility', 'visible'); // Highlight coastline by default
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
      console.log(this.map.getLayoutProperty('displaced-pop2', 'visibility'));
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
        this.setZoomExtent();
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
        this.setZoomExtent();
        if (this.currentSceneIndex > 0) {
          this.prevDisabled = false;
        } else if (this.currentSceneIndex === 0) {
          console.log(this.currentSceneIndex);
          this.prevDisabled = true;
        }
      }
    }
  }

  setCurrentLayer() {
    this.toggleableLayerIdsList.forEach((layer) => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'none');
    });

    this.scenes[this.currentSceneIndex].visibleLayer.forEach((layer) => {
      this.toggleLayer(layer);
      if (this.currentSceneIndex === 6) {
        this.scenes[6].visibleLayer.forEach((mitLayer) => {
          this.map.setLayoutProperty(mitLayer, 'visibility', 'visible');
        });
      } else if (this.currentSceneIndex !== 6) {
        this.setZoomExtent();
        this.scenes[6].visibleLayer.forEach((mitLayer) => {
          this.map.setLayoutProperty(mitLayer, 'visibility', 'none');
        });
      }
    });
  }

  setZoomExtent() {
    this.map.setCenter(this.scenes[this.currentSceneIndex].center);
    this.map.zoomTo(this.scenes[this.currentSceneIndex].zoom);
  }

  displayScene(type: any) {
    return this.scenes[this.currentSceneIndex][type];
  }

}
