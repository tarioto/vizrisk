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

}
