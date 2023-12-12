import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { AdventureCardComponent } from './components/adventure-card/adventure-card.component';
import { AdventureInfoComponent } from './components/adventure-info/adventure-info.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { AdventureDetailsComponent } from './components/adventure-details/adventure-details.component';
import { AdventureGridComponent } from './components/adventure-grid/adventure-grid.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AboutComponent } from './components/about/about.component';
import { TransformArrayForGrid } from './pipes/TransformArrayForGrid';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    AdventureCardComponent,
    AdventureInfoComponent,
    CommentModalComponent,
    AdventureDetailsComponent,
    AdventureGridComponent,
    ToolbarComponent,
    AboutComponent,
    TransformArrayForGrid
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
