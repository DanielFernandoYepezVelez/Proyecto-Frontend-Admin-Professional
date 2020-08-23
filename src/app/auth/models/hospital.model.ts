interface HospitalUser {
  id_U: string;
  name_U: string;
  img_U: string;
}

export class Hospital {
  constructor(
    public name: string,
    public id?: string,
    public img?: string,
    public activate?: string,
    public userId?: string,
    public user?: HospitalUser
  ) {}
}
