import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { AjaxService } from './ajax.service';
import { CapitalizePipe } from './capitalize.pipe';
import { SearchPipe } from './search.pipe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    HttpModule
  ],
  providers: [AjaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
