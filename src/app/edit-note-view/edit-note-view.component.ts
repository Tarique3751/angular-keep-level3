import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import {MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotesService } from '../services/notes.service';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
 
  constructor(private dialogRef : MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private notesService: NotesService) { }

  ngOnInit() {
     //console.log("inside on init ",this.data);
     this.note = this.notesService.getNoteById(this.data.note);
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe(response=>{
      if (!response) 
      {
        this.errMessage = 'We are unable to update the selected note.';
      } else
      {
        this.dialogRef.close();
      }
    }, error => {
      this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
    });
  }
}
