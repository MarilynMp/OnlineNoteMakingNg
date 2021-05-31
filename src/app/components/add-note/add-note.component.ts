import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserRoleType } from 'src/app/models/UserRoleType';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  @ViewChild('noteMessageReference') noteMessageReference : ElementRef;
  @Output('noteAdded') noteAddedEvent = new EventEmitter<void>();
  @Input('currentUser') currentUser : User;
  noteMessage : string;
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  ownerRoleId = UserRoleType.UserRoles.Owner;
  addNoteButtonDisable = false;
  isLoading = false;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  onAddNote(){
    this.addNoteButtonDisable = true;
    this.noteMessage = this.noteMessageReference.nativeElement.value;
    let userId = this.currentUser.userId;
    this.isLoading = true;

    //save note for this user(owner)
    const headers = { 'content-type': 'application/json'}  
    let body = JSON.stringify(this.noteMessage);
    let saveNoteForUserApiUrl = `${this.apiBaseUrl}/Note/${userId}/${this.ownerRoleId}`;
    this.http.post<boolean>(saveNoteForUserApiUrl,body,{'headers': headers}).subscribe(
      data => {},
      error => {},
      () => {
        this.addNoteButtonDisable = false;
        this.isLoading = false;
        this.noteAddedEvent.emit();
      });

  }
}
