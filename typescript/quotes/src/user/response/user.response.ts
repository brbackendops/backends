export class UserLoginResponse {
  private status: string;
  private data: object;

  constructor(status, data: object) {
    this.status = status;
    this.data = data;
  }
}

export class UserLoginNormal {
  private status: string;
  private message: string;

  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }
}
