
export class response {
    status: string;
    message: string;

    constructor(status:string,message:string){
        this.status = status;
        this.message = message;
    }
}


export class HResponse {
    status: string;
    data: object;

    constructor(status:string,data:object){
        this.status = status;
        this.data = data;
    }    
}