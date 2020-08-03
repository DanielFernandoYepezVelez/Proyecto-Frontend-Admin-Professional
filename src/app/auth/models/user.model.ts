export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public id?: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public activate?: boolean,
    // tslint:disable-next-line: variable-name
    public created_at?: Date
  ) {}
}
