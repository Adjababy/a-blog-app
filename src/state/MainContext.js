import React,{useEffect,useState} from 'react'
import { client } from '../Client'
export const MainContext = React.createContext()
 
const MainProvider = ({children}) => {
   const [contentData, setContentData] = useState([])
   useEffect(()=>{
    client.getEntries().then(res =>setContentData(res.items))
}, [])
    return(
        <MainContext.Provider value={{
            contentData
        }}>
            {children}
        </MainContext.Provider>
    )
}
export default MainProvider