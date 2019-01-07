import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NoteComponent } from './note/note.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Angular Material 

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {MatDialogModule} from '@angular/material/dialog';

// for form validation
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component'; 
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';

// Routes in Angular

const appRoutes : Routes = [
  { path : '' , redirectTo : 'dashboard' ,pathMatch: "full"},
  {path : 'login', component : LoginComponent},
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [CanActivateRouteGuard],
    children : [
      {path : 'view/noteview' ,component : NoteViewComponent},
      {path : 'view/listview' ,component : ListViewComponent},
      {path : '',redirectTo : 'view/noteview',pathMatch : 'full'},
      {path : 'view/editview',component : EditNoteOpenerComponent},
      {path : 'note/:noteId/edit',component: EditNoteOpenerComponent , outlet:'noteEditOutlet'}
    ]
  }
]

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    NoteComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
