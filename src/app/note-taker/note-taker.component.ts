import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit{
  errMessage: string;
  note: Note = new Note();
  notes: Array<Note>;
  constructor(private notesService: NotesService) {
    this.notes = [];
    this.note = new Note();
   }

  ngOnInit() 
  {  
    this.note = new Note();
  }
  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    console.log('text: '+this.note.text);
    console.log('title: '+this.note.title);
  
    this.notesService.addNote(this.note).subscribe(response => {
      if (response) {
        this.notes.push(this.note);
        console.log('notes : '+this.notes);
        this.note = new Note();
      } else {
        this.errMessage = 'We are unable to add the selected note.';
      }
    }, error => {
      this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
    });

  }
}
