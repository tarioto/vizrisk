import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  suburb: string;
  negligible: number;
  moderately: number;
  highly: number;
  destroyed: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {suburb: 'Outside Roseau', negligible: 451, moderately: 1470, highly: 1550, destroyed: 1429, total: 4900},
  {suburb: 'Fond Cole', negligible: 32, moderately: 57, highly: 117, destroyed: 75, total: 281},
  {suburb: 'Bath Estate', negligible: 6, moderately: 103, highly: 95, destroyed: 10, total: 214},
  {suburb: 'Elmshall', negligible: 11, moderately: 46, highly: 59, destroyed: 8, total: 124},
  {suburb: 'Kings Hill', negligible: 14, moderately: 107, highly: 211, destroyed: 55, total: 387},
  {suburb: 'Newtown', negligible: 2, moderately: 10, highly: 52, destroyed: 16, total: 80},
  {suburb: 'Goodwill', negligible: 75, moderately: 278, highly: 308, destroyed: 66, total: 727},
  {suburb: 'Potters Ville', negligible: 105, moderately: 220, highly: 227, destroyed: 50, total: 602},
  {suburb: 'Yampiece', negligible: 2, moderately: 17, highly: 43, destroyed: 3, total: 65},
  {suburb: 'Stockfarm', negligible: 29, moderately: 52, highly: 109, destroyed: 79, total: 269},
  {suburb: 'Tarish Pit', negligible: 18, moderately: 76, highly: 79, destroyed: 19, total: 192}
];

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.css']
})
export class SummaryTableComponent implements OnInit {
  displayedColumns: string[] = [
    'suburb',
    'negligible',
    'moderately',
    'highly',
    'destroyed',
    'total'
  ];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
