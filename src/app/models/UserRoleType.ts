export class UserRoleType{

    constructor(public userRoleTypeId: number, public userRoleTypeName: string) {
      
    }

    static UserRoles = {
        Owner : 1,
        Contributor : 2,
        Reader : 3
      };
}