import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Leaflet from 'leaflet';
import { LocationService } from 'frontend/src/app/shared/services/location.service';
import { Location } from '@angular-nest-mongo/shared-lib';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  locations: Location[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  }

  /**
   *
   */
  constructor(private locationService: LocationService) {
    // Search Location by Distance
    /*this.locationService.searchAllLocationsByDistance({
      lat: -0.56667,
      lng: 44.833328,
      distance: 10000
    }).subscribe(locations => {*/

    // Search All Locations in the db
    this.locationService.getAllLocations().subscribe(locations => {

      // Search only current user location
      //this.locationService.getMyLocations().subscribe(locations => {

      this.locations = locations
      this.initMarkers()
    })
  }

  initMarkers() {
    for (let index = 0; index < this.locations.length; index++) {
      const data = this.locations[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.coordinates[0]},  ${data.coordinates[1]}</b>`);
      this.map.panTo({ lat: data.coordinates[0], lng: data.coordinates[1] });
      this.markers.push(marker)
    }
  }

  generateMarker(data: Location, index: number) {
    return Leaflet.marker({ lat: data.coordinates[0], lng: data.coordinates[1] }, { draggable: true })
      .on('click', (event: any) => this.markerClicked(event, index))
      .on('dragend', (event: any) => this.markerDragEnd(event, index));
  }

  onMapReady($event: any) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
