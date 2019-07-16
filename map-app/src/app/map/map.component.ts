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
    // 1. HURRICANES IN CARIBBEAN INTRO SCENE
    {
      title: 'Imagine 90% of your country\'s buildings being damaged or destroyed in one night...',
      info: `This was the impact of Hurricane Maria on the island nation of Dominica on September 18, 2017.\n
      The 2017 Atlantic hurricane season, whose strongest storm was Maria, incurred more damage than any tropical cyclone season in recorded history. Climate experts have noted a heightened pattern of cyclonic activity since the mid-90s, as well as a southward trend in hurricane tracks towards the Lesser Antilles islands, which include Dominica. \n
      Despite contributing the least to climate change, Caribbean countries like Dominica are among the nations hardest hit by its effects.`,
      attribution: [{
        link: 'https://www.nytimes.com/2018/03/19/travel/dominica-hurricane-maria-recovery.html',
        label: `"After Maria’s Devastation, Can Dominica Be a Destination Again?" Matt Gross. New York Times.
        March 19, 2018. Retrieved July 14, 2019.`
      },
      {
        link: 'https://www.ncdc.noaa.gov/ibtracs/index.php?name=ibtracs-data',
        label: 'World Data Center for Meteorology, Asheville. (2018). International Best Track Archive for Climate Stewardship.'
      },
      {
        link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
        label: `"Update on National Hurricane Center Products and Services for 2017" (PDF). National Hurricane
        Center. May 23, 2017. Retrieved June 21, 2019.`
      },
      {
        link: 'https://www.bloomberg.com/news/articles/2018-05-10/dominica-plans-to-be-the-world-s-first-climate-resilient-country',
        label: '"The Quest to Hurricane-Proof and Island". Nikki Ekstein. Bloomberg. May 10, 2018. Retrieved June 23, 2019.'
      }],
      visibleLayer: ['dominica-coast'],
      zoom: 4.5,
      center: { lon: -71.967749, lat: 19.232773 },
      chart: {
        exists: true,
        chartOptions: {
          series: [
            {
              data: [6, 6, 5, 2],
              name: 'Category 1',
              type: 'column',
              color: 'dodgerblue',
              borderWidth: 0,
            },
            {
              data: [5, 3, 3, 5],
              name: 'Category 2',
              type: 'column',
              color: 'mediumseagreen',
              borderWidth: 0,
            },
            {
              data: [3, 3, 3, 4],
              name: 'Category 3',
              type: 'column',
              color: 'gold',
              borderWidth: 0,
            },
            {
              data: [6, 4, 7, 0],
              name: 'Category 4',
              type: 'column',
              color: 'darkorange',
              borderWidth: 0,
            },
            {
              data: [3, 3, 5, 3],
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
            text: 'Hurricane intensity and frequency in the Caribbean Sea since 1960'
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
        exists: false,
        data: [[]]
      },
      legend: {
        exists: false,
        // colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        // labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    // 2. HURRICANE MARIA INTRO SLIDE
    {
      title: 'In 2017, Hurricane Maria became the first recorded Category 5 storm to hit the island of Dominica....',
      info: `Maria had a peak intensity of more than 172 mph, and was at about 166 mph when it made landfall on Dominica. But Maria also had a rapid increase in intensity during its duration of almost 75 mph within 24 hours, the sixth-fastest hurricane intensification ever in the Atlantic basin. \n
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
      visibleLayer: ['peak-gust-mph'],
      zoom: 5.5,
      center: { lon: -63.509315, lat: 17.608075 },
      chart: {
        exists: false
      },
      table: {
        exists: false,
        data: [[]]
      },
      legend: {
        exists: false,
        colors: ['#666666', '#3cb371', '#ffd700', '#ff8c00', '#dc143c'],
        labels: ['Unknown damage', 'Negligible to slight damage', 'Moderately damaged', 'Highly damaged', 'Completely destroyed']
      }
    },
    // 3. OVERVIEW OF IMPACT OF HURRICANE MARIA ON IMPACT SCENE
    {
      title: 'Hurricane Maria resulted in damages and losses equivalent to 226\% of the country\'s gross domestic product (GDP)',
      info: 'Hurricane Maria caused significant negative impacts on the nation\'s economy, further delaying recovery and exacerbating human and social impacts. The PDNA published by the GFDRR estimates that \'a total of EC$94.9 million in income and 3.1 million work days\` has been lost as a result of the hurricane. Furthermore, \'critical employment sectors such as agriculture and tourism will take up to 12 months to resume regular operations\'. \n \n Combined with the structural damage shown in the previous slide, Hurricane Maria has displaced over 1,000 people from their homes. The spatial distribution of the internally displaced population (IDP) is shown on the map, with the most displacement concentrated in the coastlines. \n \n Overall, the GFDRR predicted a substantial increase in poverty head count from 28.8\% to 42.8\%. For long-term resilience for future hurricane seasons, both structural and economic resilience would be reduce poverty impacts.',
      attribution: [
      {
        link: 'https://www.nhc.noaa.gov/data/tcr/AL152017_Maria.pdf',
        label: 'National Hurricane Center Tropical Cyclone Report: Hurricane Maria. NOAA. 2017.'
      },
      {
        link: 'https://www.researchgate.net/publication/224327492_Engineering_Perspectives_on_Reducing_Hurricane_Damage_to_Housing_in_CARICOM_Caribbean_Islands',
        label: 'Prevatt, David & Dupigny-Giroux, L-A & Masters, Forrest. (2010). Engineering Perspectives on Reducing Hurricane Damage to Housing in CARICOM Caribbean Islands. Natural Hazards Review. 11. 140-150. 10.1061/(ASCE)NH.1527-6996.0000017.'
      },
      {
        link: 'https://www.gfdrr.org/sites/default/files/publication/dominica-pdna-maria.pdf',
        label: 'Dominica: Post-Disaster Needs Assessment following Hurricane Maria. GFDRR. 2018'
      }],
      visibleLayer: ['displaced-pop2'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      chart: {
        exists: true,
        chartOptions: {
          series: [{
            data: [1018, 459, 352],
            type: 'column',
            borderWidth: 0,
            color: '#ea7b43',
            name: 'IDP'
          }],
          chart: {
            style: {
              fontFamily: 'Helvetica Neue'
            }
          },
          title: {
            text: "Internally displaced population over time"
          },
          legend: {
            enabled: false
          },
          xAxis: {
            categories: ["October 2017", "November 2017", "January 2018"],
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
      table: {
        exists: false,
        data: [[]]
      },
      legend: {
        exists: true,
        colors: ['#ea7b4300'],
        labels: ['Total number of displaced individuals']
      }
    },
    // 4. OVERVIEW OF DOMINICA BUILDING DAMAGE SCENE (PARISH LEVEL)
    {
      title: 'Over 90% of the country\'s housing stock was damaged...',
      info: 'The chart below shows that a significant proportion of the damaged buildings were highly damaged or completely destroyed. The widespread damage left thousdands of people homeless. As the map shows, the coastlines are much more vulnerable to hurricane damage with a particularly high concentration of severely damaged housing stock on the east coast of Dominica. \n \n It is estimated that total damage to the housing sector alone is nearly US$360 million. In addition, losses resulting from this damage are estimated at US$29 million, which includes loss of rental income, demolition costs, debris removal and clean up, and shelter costs. \n \n In the GFDRR\'s proposed budget for recovery, a total of US$520 million is dedicated to housing. The group recommends that much of this budget be spent in the medium-term following the hurricane, which is in years 2019-2022. \n \n Rebuilding residential buildings using stricter building codes and connecting the most vulnerable communities through improved infrastructure can enable more efficient recovery and resilience in future hurricanes.',
      attribution: [
        {
        link: 'https://www.gfdrr.org/sites/default/files/publication/dominica-pdna-maria.pdf',
        label: 'Dominica: Post-Disaster Needs Assessment following Hurricane Maria. GFDRR. 2018'
      },
        {
        link: 'https://unitar.org/unosat/node/44/2708',
        label: 'Tropical Cyclone Maria. Buildings Damage Assessment & Related Density in Dominica - Analysis By Parish. UNITAR-INOSAT. OCtober 18, 2017. Retrieved June 2019.'
      }
    ],
      visibleLayer: ['building-data-9b0ub5'],
      zoom: 10.5,
      center: { lon: -61.351322, lat: 15.428929 },
      table: {
        exists: true
      },
      chart: {
        exists: true,
        chartOptions: {
          series: [{
            data: [{ y: 294, color: 'mediumseagreen' }, { y: 966, color: 'gold' }, { y: 1300, color: 'darkorange' }, { y: 381, color: 'crimson' }],
            type: 'column',
            name: "Damaged buildings",
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
          subtitle: {
            text: "Note that only a subset of the UNOSAT data is used in this plot. There were many more records of unknown damage (shown as gray in the map) that were not included in this chart."
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
    // 5. OVERVIEW OF DAMAGED BUILDINGS TO ROSEAU (SUBURB LEVEL)
    {
      title: 'In Roseau, the capital city of Dominica...',
      info: 'A large proportion of the buildings were either moderately or highly damaged. Much of the island nation\'s businesses, hotels, and commerce is located in Roseau.',
      attribution: [
        {
        link: 'https://www.gfdrr.org/sites/default/files/publication/dominica-pdna-maria.pdf',
        label: 'Dominica: Post-Disaster Needs Assessment following Hurricane Maria. GFDRR. 2018'
      },
        {
        link: 'https://unitar.org/unosat/node/44/2708',
        label: 'Tropical Cyclone Maria. Buildings Damage Assessment & Related Density in Dominica - Analysis By Parish. UNITAR-INOSAT. OCtober 18, 2017. Retrieved June 2019.'
      }
    ],
      table: {
        exists: false
      },
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
    // 6. VULNERABILITY OF BUILDINGS TO HIGH WIND SCENE
    {
      title: 'We can correlate the building damage to the hazard...',
      info: 'By obtaining the wind speeds at each location, we can predict the level of structural damage for future hurricanes and windstorms. Beyond 180 mph, there is a 2 in 3 chance that the building may be completely destroyed. Such correlations from damage to hazard can provide a useful structural vulnerability benchmark, and can guide building code modifications to target certain wind speed levels.',
      attribution: [
        {
        link: 'https://www.gfdrr.org/sites/default/files/publication/dominica-pdna-maria.pdf',
        label: 'Dominica: Post-Disaster Needs Assessment following Hurricane Maria. GFDRR. 2018'
      },
        {
        link: 'https://unitar.org/unosat/node/44/2708',
        label: 'Tropical Cyclone Maria. Buildings Damage Assessment & Related Density in Dominica - Analysis By Parish. UNITAR-INOSAT. OCtober 18, 2017. Retrieved June 2019.'
      }
    ],
      visibleLayer: ['building-data-9b0ub5'],
      zoom: 14.5,
      center: { lon: -61.377716, lat: 15.308563 },
      table: {
        exists: false,
        data: [[]]
      },
      chart: {
        exists: true,
        chartOptions: {
          series: [
            {
              data: [12.3, 7.4, 9.9, 12.8, 5.6],
              name: 'Negligible to slight damage',
              type: 'column',
              color: 'mediumseagreen',
              borderWidth: 0,
            },
            {
              data: [34.4, 31.1, 31.3, 38.1, 14.3],
              name: 'Moderately damaged',
              type: 'column',
              color: 'gold',
              borderWidth: 0,
            },
            {
              data: [43.3, 46.0, 39.4, 26.8, 15.0],
              name: 'Highly damaged',
              type: 'column',
              color: 'darkorange',
              borderWidth: 0,
            },
            {
              data: [10.0, 15.4, 19.3, 22.2, 65.1],
              name: 'Completely destroyed',
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
            text: 'Proportion of building damage by max wind speed'
          },
          subtitle: {
            text: "Note that only a subset of the UNOSAT data is used in this plot. There were many more records of unknown damage (shown as gray in the map) that were not included in this chart."
          },
          legend: {
            enabled: true
          },
          xAxis: {
            categories: ['140 mph', '150 mph', '160 mph', '170 mph', '180 mph'],
            labels: {
              style: {
                fontSize: '16px'
              }
            }
          },
          yAxis: {
            title: {
              text: false
            },
            max: 100,
            labels: {
              format: '{value}%'
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal'
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
    // 7. WIND HAZARD MAP SCENE
    {
      title: 'Dominica will continue to experience hurricanes in the future...',
      info: `While Dominica recovers from Hurricane Maria, the country should also look forward and fortifying itself against future hurricane seasons.\n
      The map shows an overview of the degree of windstorm susceptibility across the island (USAID 2006). High wind speeds are expected throughout the inland parts of the island, whereas the coastlines may be more susceptible to other hurricane effects such as flooding and stom surge.
      With climate change, the frequency and intensity of storms is expected to change, and worsen, for Dominica and its neighboring Lower Antilles islands*.
      Dominica should prepare to adopt building code changes that factor in the site-specific hazard, and ensure that these code changes have factored in climate change projections and how such changes will affect the hurricane hazard.
      `,
      attribution: [{
        link: 'http://charim-geonode.net/layers/geonode:wind_5c',
        label: 'CIPA. (2006). Development of a Landslide Hazard Map and Multi-Hazard Assessment for Dominica, West Indies. US-AID/COTS programme.'
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
      table: {
        exists: false,
        data: [[]]
      },
      legend: {
        exists: true,
        colors: ['#ADCBFF', '#94BDFF', '#7AABFF', '#669EFF', '#4287FF'],
        labels: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
      }
    },
    // 8. MITIGATION MEASURES SCENE
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
      table: {
        exists: false,
        data: [[]]
      },
      legend: {
        exists: true,
        colors: ['dodgerblue', 'mediumseagreen', '#666666'],
        labels: ['Coastline', 'Roads', 'Emergency shelters']
      }
    },
    // 9. FINAL SLIDE
    {
      title: 'final slide text...',
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
      table: {
        exists: false,
        data: [[]]
      },
      legend: {
        exists: true,
        colors: ['dodgerblue', 'mediumseagreen', '#666666'],
        labels: ['Coastline', 'Roads', 'Emergency shelters']
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
      if (this.currentSceneIndex >= 7) {
        this.scenes[7].visibleLayer.forEach((mitLayer) => {
          this.map.setLayoutProperty(mitLayer, 'visibility', 'visible');
        });
      } else if (this.currentSceneIndex < 7) {
        this.setZoomExtent();
        this.scenes[7].visibleLayer.forEach((mitLayer) => {
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
