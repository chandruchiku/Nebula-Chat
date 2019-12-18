import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbChatModule } from '@nebular/theme';
import { HttpModule, JsonpModule} from '@angular/http';

import {    SignalRService} from './_services/SignalR.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatUiComponent } from './chat-ui/chat-ui.component';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      ChatUiComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NbThemeModule.forRoot(),
      RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
      NbLayoutModule,
      NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
      NbButtonModule,
      NbChatModule,
      HttpModule,
      JsonpModule,
      BrowserAnimationsModule
   ],
   providers: [
    SignalRService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
