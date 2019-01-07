import { Component, Input, Output } from '@angular/core';
import { Note } from  '../note';
import { RouterService } from '../services/router.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
@Input()
noteData:Array<Note>;
@Input()
note:Note;

constructor(private routerService : RouterService) { }

ngOnInit(){
  console.log("noteData"+this.noteData);
}
OpenEditNoteView(note){
  this.routerService.routeToEditNoteView(this.note.id);
 
}
}
