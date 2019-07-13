import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map/map.component';
import { OverlayComponent } from './map/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    NgxMapboxGLModule.withConfig({
     accessToken: 'pk.eyJ1IjoidGltb3RoeS1hcmlvdG8iLCJhIjoiY2p3aWw3eTIxMDBobTRha3M2MGZ0b2t4NiJ9.PPEqq6_WNM2ngRwvSf9p2g'
     // geocoderAccessToken: 'TOKEN'
   })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
