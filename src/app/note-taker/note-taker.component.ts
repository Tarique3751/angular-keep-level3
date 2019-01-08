import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  note: Note;
  errMessage : string;

  constructor(private noteService : NotesService) {
    this.note = new Note();
   }
  
  ngOnInit() {
    this.note = new Note();
  }

  takeNote(){
    //(!this.note.text || !this.note.title)
    if(this.note.title !== '' && this.note.text !== ''){
        this.noteService.addNote(this.note).subscribe(addedNote => {
          this.note = new Note();
          location.reload();
        },
        error =>{
          this.errMessage = error.message;
        }
      );
      this.note = new Note();
    } else{
      this.errMessage = 'Title and Text both are required fields';
    }
    }

}