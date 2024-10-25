import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({ router: routerReducer }),
        StoreDevtoolsModule.instrument({
            name: 'NgRx : Getting Started',
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(),
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true // If set to true, the connection is established within the Angular zone
        }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot()
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService))
    ]
})
export class AppModule { }
