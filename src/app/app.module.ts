import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoteComponent } from './components/note/note.component';
import { HeaderComponent } from './components/header/header.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { ExistingNotesComponent } from './components/existing-notes/existing-notes.component';
import { ShareNoteComponent } from './components/share-note/share-note.component';
import { ExistingSharednotesDetailsComponent } from './components/existing-sharednotes-details/existing-sharednotes-details.component';
import { SharenoteAddnewuserComponent } from './components/sharenote-addnewuser/sharenote-addnewuser.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteComponent,
    HeaderComponent,
    AddNoteComponent,
    ExistingNotesComponent,
    ShareNoteComponent,
    ExistingSharednotesDetailsComponent,
    SharenoteAddnewuserComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
