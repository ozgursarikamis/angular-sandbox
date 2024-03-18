import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }            from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule }            from "@angular/router";

import { NodeService }             from "./services/node.service";

import { FormsModule }             from "@angular/forms";
import { SplitButtonModule }       from "primeng/splitbutton";
import { MessageService }          from "primeng/api";
import { FloatLabelModule }        from "primeng/floatlabel";
import { InputTextModule }         from "primeng/inputtext";
import { EditorModule }            from "primeng/editor";
import { TreeSelectModule }        from "primeng/treeselect";
import { TabViewModule }           from "primeng/tabview";
import { FieldsetModule }          from "primeng/fieldset";
import { MenubarModule }           from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    SplitButtonModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    EditorModule,
    TreeSelectModule,
    TabViewModule,
    FieldsetModule,
    MenubarModule
  ],
  providers: [
    MessageService,
    NodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
