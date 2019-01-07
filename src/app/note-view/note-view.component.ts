import { Component } from '@angular/core';
import { Note } from  '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  notes: Array<Note>;
  errorMessage : string;
  constructor(private noteService : NotesService) {
    this.notes = [];
   }

  ngOnInit() {
    console.log('loading notes ');
    this.noteService.getNotes().subscribe(
      notesResponseList => {
        this.notes = notesResponseList;  
        console.log("this.notes"+this.notes);
      },
      error => {
        this.errorMessage = 'Some internal Error'
      }
    );
    
  }
}
