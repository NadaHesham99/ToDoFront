export class ToDo{
  _id!:string;
  title?:string;
  status?:string;
  groupName!: {
    _id?:string;
    title?: string;
    status?: string;
    dateCreated?: Date;
  };
  dateCreated?:Date;
}
