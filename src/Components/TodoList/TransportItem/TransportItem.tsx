import React,{FC,useEffect,useState} from 'react';
import { Note,NoteContextType } from '../Item';
import { ThemeContext } from "../../Context/ContextNotes";
import '../TransportData.css'
import TextField from '@mui/material/TextField';

interface TransportItemProps{
    note:Note;
    setShowEnd:(value:boolean)=>void;
    setShowOtm:(value:boolean)=>void;
}
   
let TransportItem: FC<TransportItemProps>=({note,setShowOtm,setShowEnd})=>{
const{notes,setNotes}=React.useContext(ThemeContext) as NoteContextType;

let regNumber=/^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/;
let regName=/^[А-ЯЁ]{1}[а-яё]{0,}\s{1}[А-ЯЁ]{1}[а-яё]{0,}\s{1}[А-ЯЁ]{1}[а-яё]{0,}$/
let regPassport=/^[А-ЯЁа-яё]{0,}$/


function DobavNotes(){
  if(localStorage.getItem('person')===null){
    localStorage.setItem('person', JSON.stringify(notes));
}}

DobavNotes()

useEffect(()=>{
  function DobavLocal(){
    if(localStorage.getItem('person')!==null){
       localStorage.setItem('person', JSON.stringify(notes));
     }}
  window.addEventListener('mouseup',DobavLocal)
  return () => {
  window.removeEventListener('mouseup',DobavLocal)
  };
},[notes])

useEffect(()=>{
  let items=JSON.parse(localStorage.getItem('person')|| "");
  if(items){
    setNotes(items)
  }
},[])

function DeleteNote(e: React.MouseEvent, id: number){
    e.preventDefault()
    setShowOtm(true)
  }
function DobavNote(e: React.MouseEvent, note: Note){
    e.preventDefault();
    if(regNumber.test(note.number)&&
    regName.test(note.name)&&
    regPassport.test(note.passportWhom)&&
    regPassport.test(note.passportWhere)&&
    note.number &&
    note.transport &&
    note.data && 
    note.name && 
    note.passportSeria && 
    note.passportNumber && 
    note.passportWhom && 
    note.passportWhere){
       setShowEnd(true)
      }
    else{
       setNotes(notes.map(elem=>{
        return {...elem,error:true}}
      ))}}


return (<div key={note.id} className="TextField__main"> 
            <form>
              <div className="TextField">
                <div className="TextField_input">
                    <TextField  name="number" 
                                id="standard-basic" 
                                label="Укажите го-номер(например, A000AA000)" 
                                variant="standard" 
                                className='TextField_input' 
                                helperText={note.error&&!note.number.length ? "*Напишите го-номер*" : ""} 
                                error={(note.error&&!note.number.length)||(note.error&&!regNumber.test(note.number))}
                                value={note.number} 
                                onChange={event=>{setNotes(notes.map(elem=>{
                                                  return {...elem,number:event.target.value}}))}}/>
                </div>
                {note.error===true&&
                note.number.length&&
                !regNumber.test(note.number)?<span className="Error__span">{note.textErrorNumber}</span>:<span></span>}
              </div>
              <br/>
              <div className="TextField">
                <div className="TextField_input">
                    <TextField name="transport"  
                               id="standard-basic" 
                               label="Транспортное средство" 
                               variant="standard" 
                               className='TextField_input' 
                               value={note.transport} 
                               helperText={note.error&&!note.transport.length ? "*Напишите транспортное средство" : ""} 
                               error={note.error&&!note.transport.length}
                               onChange={event=>{setNotes(notes.map(elem=>{
                                                 return {...elem,transport:event.target.value}}))}}/>
                </div>                  
              </div>                  
              <br/>
              <div className="TextField">
                <span className="TextField_passport-data-span">Ориентировачная дата прибытия к покупателю</span>  
                <div className="TextField_input">
                    <TextField type="date" 
                               name="data"  
                               id="standard-basic" 
                               label="" 
                               variant="standard" 
                               className='TextField_input' 
                               value={note.data}
                               helperText={note.error&&!note.data.length ? "*Напишите дату" : ""} 
                               error={note.error&&!note.data.length} 
                               onChange={event=>setNotes(notes.map(elem=>{
                                                return {...elem,data:event.target.value}}))}/>
                </div>                  
              </div>  
              <br/>
              <div className="TextField_Name">
                <span className="TextField_person-span">Данные о водителе</span> 
                <div className="TextField_input">
                    <TextField name="name"  
                               id="standard-basic" 
                               label="Укажите ФИО водителя" 
                               variant="standard" 
                               className='TextField_input' 
                               value={note.name}
                               helperText={note.error&&!note.name.length ? "*Напишите ФИО" : ""} 
                               error={(note.error&&!note.name.length)||(note.error&&!regName.test(note.name))} 
                               onChange={event=>setNotes(notes.map(elem=>{
                                                return {...elem,name:event.target.value}}))}/>
                    {note.error===true&&
                    note.name.length&&
                    !regName.test(note.name)?<span className="Error__span">{note.textErrorName}</span>:<span></span>}                            
                </div>                
            </div>                
            <br/>
            <div className="TextField_Passport">
              <span className="TextField_data-span">Паспортные данные</span>  
              <div className="TextField_passport-data">
                 <div className="TextField_part">
                    <TextField type="number" 
                               name="passportSeria" 
                               id="standard-basic" 
                               label="Серия" 
                               variant="standard" 
                               className="TextField_part" 
                               value={note.passportSeria}
                               helperText={note.error&&note.passportSeria.length<4 ? "*Напишите серию вашего паспорта" : ""} 
                               error={note.error&&note.passportSeria.length<4} 
                               onChange={event=>{if(event.target.value.toString().length <= 4) {
                                                   setNotes(notes.map(elem=>{
                                                   return {...elem,passportSeria:event.target.value}}))}}}/>
                 </div>
                  
                 <div className="TextField_part">
                    <TextField type="number" 
                               name="passportNumber"  
                               id="standard-basic" 
                               label="Номер" 
                               variant="standard" 
                               className="TextField_part"
                               value={note.passportNumber}
                               helperText={note.error&&note.passportNumber.length<6 ? "*Напишите номер вашего паспорта" : ""} 
                               error={note.error&&note.passportNumber.length<6}  
                               onChange={event=>{if(event.target.value.toString().length <= 6) {
                                                   setNotes(notes.map(elem=>{
                                                   return {...elem,passportNumber:event.target.value}}))}}}/>

                 </div>
              </div>
            </div>
            <br/>
            <div className="TextField">
              <div className="TextField_input">
                <TextField name="passportWhom"  
                           id="standard-basic" 
                           label="Кем выдан" 
                           variant="standard" 
                           className='TextField_input' 
                           value={note.passportWhom}
                           helperText={note.error&&!note.passportWhom.length ? "*Напишите паспортные данные" : ""} 
                           error={(note.error&&!note.passportWhom.length)||(note.error&&!regPassport.test(note.passportWhom))}  
                           onChange={event=>setNotes(notes.map(elem=>{
                                            return {...elem,passportWhom:event.target.value}}))}/>
                {note.error===true&&
                note.passportWhom.length&&
                !regPassport.test(note.passportWhom)?<span className="Error__span">{note.textErrorPassportWhow}</span>:<span></span>}
               </div>             
            </div>             
            <br/>
            <div className="TextField">
              <div className="TextField_input">
                <TextField name="passportNumber"  
                           id="standard-basic" 
                           label="Когда выдан" 
                           variant="standard" 
                           className='TextField_input' 
                           value={note.passportWhere}
                           helperText={note.error&&!note.passportWhere.length ? "*Напишите паспортные данные" : ""} 
                           error={(note.error&&!note.passportWhere.length)||(note.error&&!regPassport.test(note.passportWhere))}  
                           onChange={event=>setNotes(notes.map(elem=>{
                                            return {...elem,passportWhere:event.target.value}}))}/>
                {note.error===true&&
                note.passportWhere.length
                &&!regPassport.test(note.passportWhere)?<span className="Error__span">{note.textErrorPassportWhere}</span>:<span></span>}                            
              </div>            
            </div>            
            <br/>
            <div className="TextField_buttons">
              <button className='TextField_button' onClick={(e) => DobavNote(e,note)}>Отправить</button>                
              <button className='TextField_button' onClick={(e) => DeleteNote(e,note.id)}>Отменить</button></div>
    </form>
    </div>
   
  )}

export default TransportItem;