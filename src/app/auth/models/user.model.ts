import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

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

  get imageUrl(): string {
    if (this.img?.includes('https')) {
      return this.img;
    }

    /* http://localhost:3000/api/upload/doctors/7eca1dab-2afd-4b9f-9e87-4588b9eedb4.jpg */
    if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-image`;
    }
  }
}
