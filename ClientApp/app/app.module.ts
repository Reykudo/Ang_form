import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from "../data.services";
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask'
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxMaskModule.forRoot()
    ],

    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
