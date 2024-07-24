export class UserModel{
    id: number;
    username: string;
    password: string;
    
    constructor(userModel: UserModel){
        this.id = userModel.id;
        this.username = userModel.username;
        this.password = userModel.password;
    }

}