import {createContext,useContext,useEffect,useState} from 'react';
import {supabase} from '../lib/supabase';
const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true);
 useEffect(()=>{if(!supabase){setLoading(false);return;}let active=true;
 supabase.auth.getUser().then(({data})=>{if(active){setUser(data.user??null);setLoading(false);}}).catch(()=>{if(active)setLoading(false)});
 const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{if(active){setUser(session?.user??null);setLoading(false)}});
 return ()=>{active=false;subscription.unsubscribe()};},[]);
 return <AuthContext.Provider value={{user,loading,signOut:()=>supabase.auth.signOut()}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
