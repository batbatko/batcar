import {Navigate,useLocation} from 'react-router-dom';import {useAuth} from '../context/AuthContext';
export function Private({children})
{
    const {user,loading}=useAuth(),location=useLocation();
    if(loading) 
        return <div className="container state">Checking your session…</div>;
        return user?children:<Navigate to="/login" state={{from:location.pathname}}
        replace/>;}

        export function Guest({children}){
        const {user,loading}=useAuth();
        if(loading)
            return <div className="container state">Checking your session…</div>;
            return user?<Navigate to="/cars" replace/>:children;
}
