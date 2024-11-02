import React, { useState, useEffect,ChangeEvent } from "react";
import TransportItem from "./TransportItem/TransportItem";
import { NoteContextType } from './Item';
import { ThemeContext } from "../Context/ContextNotes";
import './TransportData.css';


export function TransportData() {
const{notes}=React.useContext(ThemeContext) as NoteContextType;
const [showEnd,setShowEnd]=useState(false)
const [showOtm,setShowOtm]=useState(false)
let res;

useEffect(()=>{
  if(showEnd || showOtm){
    localStorage.removeItem("person")
  }
},[showEnd,showOtm])

if(showEnd){
  res=<div className="Finish__main"><h1>Ваши данные отправлены 🗸</h1></div>}
else{
  if(showOtm){
    res=<div className="Finish__main"><h1>Ваши данные не отправлены</h1></div>}
  else{
    res=notes.map(note=>{
      return <TransportItem note={note} setShowEnd={setShowEnd} setShowOtm={setShowOtm}/>
  })}}
      

return (<div>{res}</div>)}
