import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { MariaLegendComponent } from './map/maria-legend/maria-legend.component';
import { SummaryTableComponent } from './map/summary-table/summary-table.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MariaLegendComponent,
    SummaryTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
     accessToken: 'pk.eyJ1IjoidGltb3RoeS1hcmlvdG8iLCJhIjoiY2p3aWw3eTIxMDBobTRha3M2MGZ0b2t4NiJ9.PPEqq6_WNM2ngRwvSf9p2g'
     // geocoderAccessToken: 'TOKEN'
   }),
    ReactiveFormsModule,
    FlexLayoutModule,
    HighchartsChartModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
