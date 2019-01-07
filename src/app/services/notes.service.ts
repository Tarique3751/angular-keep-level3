import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService} from './authentication.service';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  
  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
      }

  fetchNotesFromServer() {

  }

  // getNotes(): BehaviorSubject<Array<Note>> {
  //   this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
  //     headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
  //   }).subscribe(data => 
  //     {
  //      this.notesSubject.next(data);
      
  //     }
  //   );
  //   return this.notesSubject;
  // }

  getNotes(): Observable<Array<Note>> {
    console.log('inside getnotes() method');
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
       headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
     });
  }

  addNote(note: Note): Observable<Note> {
    
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>('http://localhost:3000/api/v1/${note.id}', note.id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getNoteById(noteId): Note {
  this.notes.forEach(function (note) 
  {
   console.log(note);
    if(note.id===noteId)
    {
        return note;
    } 
  }); 
  return null;
  }
}
