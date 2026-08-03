import React,{useEffect,useState} from 'react'
import { client } from '../Client'
export const MainContext = React.createContext()

const MainProvider = ({children}) => {
   const [contentData, setContentData] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(()=>{
    client.getEntries()
      .then(res => {
        setContentData(res.items)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
}, [])

    return(
        <MainContext.Provider value={{
            contentData,
            loading,
            error
        }}>
            {children}
        </MainContext.Provider>
    )
}
export default MainProvider