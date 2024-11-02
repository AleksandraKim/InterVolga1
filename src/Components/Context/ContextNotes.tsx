import { createContext}  from "react"
import {NoteContextType} from '../TodoList/Item'


export const ThemeContext = createContext<NoteContextType|null>(null);

