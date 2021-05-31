import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserAssociatedToNoteView } from 'src/app/models/UserAssociatedToNoteView';
import { UserRoleType } from 'src/app/models/UserRoleType';

@Component({
  selector: 'app-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.css']
})
export class ShareNoteComponent implements OnInit, OnDestroy {
  currentNoteId: number;
  currentuserName: string;
  paramsSubscription: Subscription;
  usersForNote: UserAssociatedToNoteView[] = [];
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  noUsersForNote = false;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(
      (params) => {
        this.currentNoteId = params['noteId'];
        console.log(this.currentNoteId);
        //get all the users associated to this note
        this.getAllUsersAssociatedToThisNote(this.currentNoteId).subscribe(
          usersForNotesResponse => {
            this.usersForNote = usersForNotesResponse;

            //filtering out the users except the owner user
            this.usersForNote = this.usersForNote.filter(user => {
              return user.userRoleId != UserRoleType.UserRoles.Owner
            });

            if(this.usersForNote.length == 0)
            {
              this.noUsersForNote = true;
            }
          }
        );
      }
    );

  }

  getAllUsersAssociatedToThisNote(noteId: number): Observable<UserAssociatedToNoteView[]> {
    let usersAssociatedToNoteApiUrl: string = `${this.apiBaseUrl}/User/Note/${noteId}`;
    return this.http.get<UserAssociatedToNoteView[]>(usersAssociatedToNoteApiUrl);
  }

  onShareNote(){
    this.getAllUsersAssociatedToThisNote(this.currentNoteId).subscribe(
      usersForNotesResponse => {
        this.usersForNote = usersForNotesResponse;

        //filtering out the users except the owner user
        this.usersForNote = this.usersForNote.filter(user => {
          return user.userRoleId != UserRoleType.UserRoles.Owner
        });
      }
    );
  }

  onDeleteNote(){
    this.getAllUsersAssociatedToThisNote(this.currentNoteId).subscribe(
      usersForNotesResponse => {
        this.usersForNote = usersForNotesResponse;

        //filtering out the users except the owner user
        this.usersForNote = this.usersForNote.filter(user => {
          return user.userRoleId != UserRoleType.UserRoles.Owner
        });
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
