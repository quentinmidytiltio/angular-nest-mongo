import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Leaflet from 'leaflet';
import { LocationService } from 'frontend/src/app/shared/services/location.service';
import { groupBy, Location, User } from '@angular-nest-mongo/shared-lib';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  map!: Leaflet.Map;
  markers: Leaflet.CircleMarker[] = [];
  locations: Location[] = [];
  locationsGroupedByOwner!: Map<any, any>;
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
    this.locationService.searchAllLocationsByDistance({
      lat: -0.56667,
      lng: 44.833328,
      distance: 10000000
    }).subscribe(locations => {

      // Search All Locations in the db
      //this.locationService.getAllLocations().subscribe(locations => {

      // Search only current user location
      //this.locationService.getMyLocations().subscribe(locations => {

      this.locations = locations
      this.locationsGroupedByOwner = groupBy(this.locations, location => location.owner)

      console.log(this.locationsGroupedByOwner)

      //this.initMarkers(this.locations)

      this.initMarkersGroupedBy()
    })
  }

  initMarkers(locations: Location[], owner: User | null = null, color: string) {
    for (let index = 0; index < locations.length; index++) {
      const data = locations[index];
      const marker = this.generateMarker(data, index, color);
      marker.addTo(this.map).bindPopup(`<b>${data.coordinates[0]},  ${data.coordinates[1]} - ${owner?.email}</b>`);
      this.map.panTo({ lat: data.coordinates[0], lng: data.coordinates[1] });
      this.markers.push(marker)
    }
  }

  initMarkersGroupedBy() {

    let index = 0;
    this.locationsGroupedByOwner.forEach((locations, owner) => {
      const color = `#${index * 10 % 2}${index * 5 % 4}${index * 6 % 3}${index * 7 % 5}${index * 8 % 6}${index * 9 % 7}`
      this.initMarkers(locations, owner, color)
      index++
    });
  }

  generateMarker(data: Location, index: number, color: string) {
    const marker = Leaflet.circleMarker({ lat: data.coordinates[0], lng: data.coordinates[1] }, { radius: 20, color: color })
      .on('click', (event: any) => this.markerClicked(event, index))
      .on('dragend', (event: any) => this.markerDragEnd(event, index));

    return marker
  }

  onMapReady($event: any) {
    this.map = $event;
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
