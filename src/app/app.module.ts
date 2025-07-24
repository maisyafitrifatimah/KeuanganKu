import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from './services/database.service';
import { NgChartsModule } from 'ng2-charts';
import { PostProvider } from '../provider/post-provider';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    
  ],
  providers: [
    PostProvider,
    SQLite, 
    DatabaseService, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
