import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { TabsModule }  from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokenavComponent } from './pokenav/pokenav.component';

import { PokemonDataService } from './pokemon-data.service';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    HomeComponent,
    SearchComponent,
    PokemonComponent,
    PokenavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    TabsModule.forRoot(),
  ],
  providers: [PokemonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
