import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    {
        path: 'geolocalization',
        loadChildren: () =>
            import('./pages/geolocalization/geolocalization.module').then(
                (m) => m.GeolocalizationModule
            ),
    },
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
