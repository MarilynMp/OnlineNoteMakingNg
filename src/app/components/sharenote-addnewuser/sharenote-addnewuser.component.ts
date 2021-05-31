import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserAssociatedToNoteView } from 'src/app/models/UserAssociatedToNoteView';
import { UserRoleType } from 'src/app/models/UserRoleType';

@Component({
  selector: 'app-sharenote-addnewuser',
  templateUrl: './sharenote-addnewuser.component.html',
  styleUrls: ['./sharenote-addnewuser.component.css']
})
export class SharenoteAddnewuserComponent implements OnInit {
  userRoles: UserRoleType[] = [];
  allUsers: User[] = [];
  currentUserName: string;
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  currentNoteId: number;
  isLoading : boolean = false;
  selectedUserName : string;
  selectedUserRoleTypeName : string;
  selectedUser : User;
  @Output('shareNoteEvent') shareNoteEvent = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUserName = this.route.snapshot.queryParams['username'];
    this.currentNoteId = +(this.route.snapshot.params['noteId']);

    //get all user roles
    this.getUserRoles().subscribe(
      userRolesResponse => {
        this.userRoles = userRolesResponse;
        this.userRoles = this.userRoles.filter(role => { return role.userRoleTypeId != UserRoleType.UserRoles.Owner })
      }
    );

    //get all non-associated users
    this.getAllUsers().subscribe(
      userResponse => {
        this.allUsers = userResponse;
        this.allUsers = this.allUsers.filter(user => {
          return user.userName != this.currentUserName;
        });
      }
    );
  }

  getAllUsersAssociatedToThisNote(noteId: number): Observable<UserAssociatedToNoteView[]> {
    let usersAssociatedToNoteApiUrl: string = `${this.apiBaseUrl}/User/Note/${noteId}`;
    return this.http.get<UserAssociatedToNoteView[]>(usersAssociatedToNoteApiUrl);
  }


  getUserRoles(): Observable<UserRoleType[]> {
    let userRolesApiUrl: string = `${this.apiBaseUrl}/User/RoleType`;
    return this.http.get<UserRoleType[]>(userRolesApiUrl);
  }

  getAllUsers(): Observable<User[]> {
    let usersApiUrl: string = `${this.apiBaseUrl}/User`;
    return this.http.get<User[]>(usersApiUrl);
  }

  onNoteShare() {
    this.isLoading = true;
    let selectedUserRoleTypeId = this.userRoles.find(ur => ur.userRoleTypeName == this.selectedUserRoleTypeName).userRoleTypeId;
    this.selectedUser = this.allUsers.find(u => u.userName == this.selectedUserName);
    //add user note association
    
    const headers = { 'content-type': 'application/json'}  ;
    let jsonBody = {
      'userId': this.selectedUser.userId,
      'userRoleId': selectedUserRoleTypeId,
      'noteId': this.currentNoteId
    };
    let body = JSON.stringify(jsonBody);
    let saveNoteUserAssnApiUrl = `${this.apiBaseUrl}/Note/NoteUserAssociation`;
    this.http.post<number>(saveNoteUserAssnApiUrl,body,{'headers': headers}).subscribe(
      data => {},
      error => {},
      () => {
        this.isLoading = false;
        this.shareNoteEvent.emit();
      });
  }

}
