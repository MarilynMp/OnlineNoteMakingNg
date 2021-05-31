export class UserAssociatedToNoteView{
    constructor(
        public noteUserAssociationId : number,
        public noteId : number,
        public userName : string,
        public userId : number,
        public userRoleId : number,
        public userRoleName : string){

    }
}