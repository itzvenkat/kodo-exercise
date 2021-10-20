import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './core/home/home.component';
import { SharedModule } from './shared/shared.module';
import { CardsComponent } from './core/home/cards/cards.component';
import { TableComponent } from './core/home/table/table.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { loaderConfig } from './shared/constants/app.constants';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(loaderConfig)
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
