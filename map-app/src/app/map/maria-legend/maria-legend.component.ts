import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maria-legend',
  templateUrl: './maria-legend.component.html',
  styleUrls: ['./maria-legend.component.css']
})
export class MariaLegendComponent implements OnInit {
  @Input() colors: string[];
  @Input() labels: string[];


  constructor() { }

  ngOnInit() {
  }

}
