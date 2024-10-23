
export class UserResponse {
    status: string;
    message: string;

    constructor(status:string,message:string){
        this.status = status;
        this.message = message;
    }
}


export class UserDataResponse {
    status: string;
    data: object;

    constructor(status:string,data:object){
        this.status = status;
        this.data = data;
    }
}