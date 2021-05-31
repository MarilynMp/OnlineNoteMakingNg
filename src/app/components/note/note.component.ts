import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NoteUserAssociationView } from 'src/app/models/NoteUserAssociationView';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserNameFromQueryParam: string;
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  notesForCurrentUser : NoteUserAssociationView[] = [];
  queryParamsSubscription : Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams) => {
        this.currentUserNameFromQueryParam = queryParams['username'];
        //get user details by username
        this.getUserDetailsByName(this.currentUserNameFromQueryParam).subscribe(
          userResponse => {
            this.currentUser = userResponse;
            //get notes associated to user
            this.getNotesForUser(this.currentUser.userId).subscribe(
                notesResponse => {
                  this.notesForCurrentUser = notesResponse;
                }
            );

          }
        );
      }
    )
  }

  getUserDetailsByName(userName: string) : Observable<User> {
    let userDetailsByUserNameUrl : string = `${this.apiBaseUrl}/User/${userName}`;
    return this.http.get<User>(userDetailsByUserNameUrl);
  }

  getNotesForUser(userId: number) : Observable<NoteUserAssociationView[]> {
    let notesForUserApiUrl : string = `${this.apiBaseUrl}/Note/${userId}`;
    return this.http.get<NoteUserAssociationView[]>(notesForUserApiUrl);
  }

  onNoteAdded(){
    this.getNotesForUser(this.currentUser.userId).subscribe(
      notesResponse => {
        this.notesForCurrentUser = notesResponse;
      }
    );
  } 

  onNoteDeleted(){
    this.getNotesForUser(this.currentUser.userId).subscribe(
      notesResponse => {
        this.notesForCurrentUser = notesResponse;
      }
    );
  }

  ngOnDestroy(){
    this.queryParamsSubscription.unsubscribe();
  }
  
}
