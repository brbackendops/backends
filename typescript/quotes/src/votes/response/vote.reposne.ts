export class VoteResponseNormal {
  private status: string;
  private message: string;

  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class VoteResponseData {
  private status: string;
  private data: object;

  constructor(status: string, data: object) {
    this.status = status;
    this.data = data;
  }
}
