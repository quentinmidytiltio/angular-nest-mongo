import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { GeolocalizationRoutingModule } from './geolocalization-routing.module';
import { MapComponent } from './map/map.component';



@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [MapComponent],
  imports: [
    CommonModule,
    SharedModule,
    GeolocalizationRoutingModule
  ]
})
export class GeolocalizationModule { }
