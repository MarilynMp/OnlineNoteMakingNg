export class NoteUserAssociationView{
    constructor(    
        public noteId: number, 
        public noteMessage : string,
        public userId : number, 
        public userRoleId : number){}
}