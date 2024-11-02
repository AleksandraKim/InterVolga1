export interface Note {
    id:number;
    number: string;
    transport: string;
    data:string;
    name:string;
    passportSeria:string;
    passportNumber:string;
    passportWhom:string;
    passportWhere:string;
    error:boolean;
    textErrorNumber:string;
    textErrorName:string;
    textErrorPassportWhow:string;
    textErrorPassportWhere:string;
  }
let arr=[{
  id:Math.random(),
  number: '',
  transport: '',
  data:'',
  name:'',
  passportSeria:'',
  passportNumber:'',
  passportWhom:'',
  passportWhere:'',
  error:false,
  textErrorNumber:'Неправильно ввели го-номер',
  textErrorName:'Неправильно ввели ФИО',
  textErrorPassportWhow:'Неправильно ввели паспортные данные',
  textErrorPassportWhere:'Неправильно ввели паспортные данные'
}]
export default arr;

export type NoteContextType = {
    notes:Note[];
    setNotes:(value:Note[])=>void;
  };