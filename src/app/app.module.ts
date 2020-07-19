import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeService } from "./home/home.service";
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from "@ngrx/store";
import {homeReducer} from "./home/home.reducer";
import {HomeEffects} from "./home/home.effects";
import {HomeResolve} from "./home/home.resolve";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('users', homeReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [HomeService, HomeResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
