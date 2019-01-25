import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {tap} from 'rxjs/operators';

@Injectable()
export class NotesService {
  token: any;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    this.token = this.authService.getBearerToken();
    const headers = new HttpHeaders().set('Authorization',
    `Bearer ${this.authService.getBearerToken()}`);
    this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers : headers
    }).subscribe(notes  => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    }, (err: any) => {
      this.notesSubject.error(err);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers : headers
    });
  }

  editNote(note: Note): Observable<Note> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers : headers
    }).pipe(tap(editedNote => {
      const existingNote = this.notes.find(noteValue => noteValue.id === editedNote.id);
       Object.assign(existingNote, editedNote);
      this.notesSubject.next(this.notes);
   }));
  }

  getNoteById(noteId: number): Note {
    const retrivedNote = this.notes.find(note => note.id === noteId);
    return Object.assign({}, retrivedNote);
  }
}
