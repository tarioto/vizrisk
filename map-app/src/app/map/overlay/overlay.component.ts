import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  @Input() currentSceneIndex: number;
  @Input() scenes: any;
  constructor() { }

  ngOnInit() {
  }

  displayScene(type: any) {
    return this.scenes[this.currentSceneIndex][type];
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
  }

}
