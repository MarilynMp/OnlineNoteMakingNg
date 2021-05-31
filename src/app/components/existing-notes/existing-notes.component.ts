import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteUserAssociationView } from 'src/app/models/NoteUserAssociationView';
import { UserRoleType } from 'src/app/models/UserRoleType';

@Component({
  selector: 'app-existing-notes',
  templateUrl: './existing-notes.component.html',
  styleUrls: ['./existing-notes.component.css']
})
export class ExistingNotesComponent implements OnInit {
  @Input('noteForUser') noteForUser : NoteUserAssociationView;
  @Output('noteDeleted') noteDeletedEvent = new EventEmitter<void>();
  userRoleType : string;
  canNoteBeUpdated = false;
  canNoteBeDeleted = false;
  canNoteBeShared = false;
  isLoading = false;
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  @ViewChild('noteMessageReference') noteMessageReference : ElementRef;
  noteMessage;

  constructor(
    private http: HttpClient,
    private router : Router,
    private route : ActivatedRoute) {
    }

  ngOnInit(): void {
    
    if(this.noteForUser.userRoleId == UserRoleType.UserRoles.Owner)
    {
      this.canNoteBeDeleted = true;
      this.canNoteBeUpdated = true;
      this.canNoteBeShared = true;
      this.userRoleType = 'Owner';
    }
    else if (this.noteForUser.userRoleId == UserRoleType.UserRoles.Contributor)
    {
      this.canNoteBeDeleted = false;
      this.canNoteBeUpdated = true;
      this.canNoteBeShared = false;
      this.userRoleType = 'Contributor';
    }
    else{
      this.canNoteBeDeleted = false;
      this.canNoteBeUpdated = false;
      this.canNoteBeShared = false;
      this.userRoleType = 'Reader';
    }
  }

  onUpdateNote(){
    this.canNoteBeUpdated = false;
    this.isLoading = true;

    //call update note
    this.noteMessage = this.noteMessageReference.nativeElement.value;
    const headers = { 'content-type': 'application/json'} ;
    let body = JSON.stringify(this.noteMessage);
    let updateeNoteForUserApiUrl = `${this.apiBaseUrl}/Note/${this.noteForUser.noteId}`;
    this.http.put<boolean>(updateeNoteForUserApiUrl,body,{'headers': headers}).subscribe(
      data => {},
      error => {},
      () => {
        this.canNoteBeUpdated = true;
        this.isLoading = false;
      });

  }

  onDeleteNote(){
    this.canNoteBeDeleted = false;
    this.isLoading = true;

    //call delete note
    let deleteNoteByIdApiUrl = `${this.apiBaseUrl}/Note/${this.noteForUser.noteId}`;
    this.http.delete<boolean>(deleteNoteByIdApiUrl).subscribe(
      data => {},
      error => {},
      () => {
        this.canNoteBeDeleted = true;
        this.isLoading = false;
        //emit event to parent for refresh of notes
        this.noteDeletedEvent.emit();
      });
  }

  onShareNote(){
    //navigate to share component for this note
    this.router.navigate(
      [`${this.noteForUser.noteId}/share`],
      {relativeTo : this.route, queryParamsHandling : 'preserve'});
  }

}
