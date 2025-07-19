import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductSelection } from 'src/products/product-selection/product-selection';
import { ProductService } from 'src/products/product.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from 'app-data';
import { ReviewList } from 'src/reviews/review-list/review-list';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductSelection,
    ReviewList
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ProductService,
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(AppData, { delay: 1000, passThruUnknownUrl: true })
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
