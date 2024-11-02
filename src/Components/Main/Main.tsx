import React,{FC,useState} from 'react';
import { TransportData } from '../TodoList/TransportData';
import { Note } from '../TodoList/Item';
import './Main.css';
import { ThemeContext } from '../Context/ContextNotes';
import arr from '../TodoList/Item';

interface MainProps{
   toggleTheme:()=>void;
}

let Main: FC<MainProps>=({toggleTheme})=>{
const [notes,setNotes]=useState<Note[]>(arr)

return (<div className="Main_Test-page">
           <button className='Main_Button' onClick={toggleTheme}>
              `TOGGLETHEME`
           </button>
            <div className="Main-Test-page-head">
               <h1>Транспортные средства и водители</h1>
            </div>
            <ThemeContext.Provider value={{notes,setNotes}}>
               <TransportData/>
            </ThemeContext.Provider>
        </div>);
  }
  
export default Main;