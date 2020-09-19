import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from './../../environments/environment';
import { scenes } from './scenes';
import * as mapboxgl from 'mapbox-gl';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('infoContainer') contentRef: ElementRef;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'column'
    }],
    chart: {
      style: {
        fontFamily: 'Helvetica '
      }
    }
  };
  updateFlag = true;
  map: mapboxgl.Map;
  style = 'mapbox://styles/awilson1233/cjy3dg55f2kxh1covpds8dnh5';
  lat = 19.232773;
  lng = -71.967749;
  layers: any;
  currentSceneIndex = 0;
  scenes: any[] = scenes;

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
      id: 'peak-gust-0xiyjn',
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
      id: 'dominica-buildings-gray',
      displayName: 'Dominica Buildings',
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

    this.map.on('load', () => {
      this.toggleableLayerIdsList.forEach((layer) => {
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
      this.map.setLayoutProperty('dominica-coast', 'visibility', 'visible'); // Highlight coastline by default
    });

    this.map.on('click', 'dominica-damage-buildings', (e) => {
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


  changeScene(direction: any) {
    this.updateFlag = false;
    if (direction === 'next') {
      this.prevDisabled = false;
      if (this.currentSceneIndex < this.scenes.length - 1) {
        this.currentSceneIndex += 1;
        setTimeout(() => this.updateFlag = true, 1);
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
        setTimeout(() => this.updateFlag = true, 1);
        this.setCurrentLayer();
        this.setZoomExtent();
        if (this.currentSceneIndex > 0) {
          this.prevDisabled = false;
        } else if (this.currentSceneIndex === 0) {
          this.prevDisabled = true;
        }
      }
    }
    this.updateFlag = false;
    this.scrollCardContentToTop();
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

  private scrollCardContentToTop(): void {
    this.contentRef.nativeElement.scrollTo(0, 0);
  }

}
