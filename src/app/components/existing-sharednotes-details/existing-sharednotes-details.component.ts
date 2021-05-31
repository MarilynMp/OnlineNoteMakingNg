import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAssociatedToNoteView } from 'src/app/models/UserAssociatedToNoteView';

@Component({
  selector: 'app-existing-sharednotes-details',
  templateUrl: './existing-sharednotes-details.component.html',
  styleUrls: ['./existing-sharednotes-details.component.css']
})
export class ExistingSharednotesDetailsComponent implements OnInit {
  @Input('currentUser') currentUser : UserAssociatedToNoteView;
  stopSharingDisabled : boolean = false;
  apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
  @Output('deleteNoteEvent') deleteNoteEvent = new EventEmitter<void>();

  constructor(private http : HttpClient) { }
  

  ngOnInit(): void {
  }

  onStopSharing(){
    this.stopSharingDisabled = true;
    let noteUserAssociationId = this.currentUser.noteUserAssociationId;

    //delete user note association
    let deleteNoteUserAssnApiUrl = `${this.apiBaseUrl}/Note/NoteAssociation/${noteUserAssociationId}`;
    this.http.delete<number>(deleteNoteUserAssnApiUrl).subscribe(
      data => {},
      error => {},
      () => {
        this.stopSharingDisabled = false;
        this.deleteNoteEvent.emit();
      });

  }

}
