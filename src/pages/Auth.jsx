import {useState} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {supabase,configured} from '../lib/supabase';
export default function Auth({mode})
{const register=mode==='register',navigate=useNavigate(),location=useLocation();
    const [email,setEmail]=useState(''),
    [password,setPassword]=useState(''),
    [confirm,setConfirm]=useState(''),
    [name,setName]=useState(''),
    [error,setError]=useState(''),
    [success,setSuccess]=useState(''),
    [busy,setBusy]=useState(false);
 async function submit(e){e.preventDefault();setError('');setSuccess('');
    if(!configured){setError('Configure Supabase first.');
        return;}
        if(!/^\S+@\S+\.\S+$/.test(email)){setError('Enter a valid email address.');
            return;}
            
            if(password.length<6){setError('Password must be at least 6 characters.');
                return;}
                if(register&&name.trim().length<2){setError('Name must be at least 2 characters.');
                    return;}
                    if(register&&password!==confirm){setError('Passwords do not match.');
                        return;}
                        setBusy(true);
                        try {
                            if(register){
                                const {data,error}=await supabase.auth.signUp({
                                    email,password,options:{data:{display_name:name.trim()}}});
                                    if(error)throw error;if(data.session)navigate('/cars');
                                    else setSuccess('Account created. Check your email for a confirmation link, then log in.');}
                                    else {
                                        const {error}=await supabase.auth.signInWithPassword({email,password});
                                        if(error)throw error;navigate(location.state?.from||'/cars',{replace:true});
                                    }}
                                    catch(e){setError(e.message)}finally{setBusy(false)}}
 return <div className="auth-shell">
    <div className="auth-visual">
        <span className="eyebrow light">BATCAR MEMBERSHIP</span><h2>Great journeys<br/>begin here.</h2>
        <p>Join a community built around finding your next car.</p></div>
        <div className="auth-panel"><span className="eyebrow">WELCOME {register?'ABOARD':'BACK'}</span>
        <h1>{register?'Create an account':'Log in to BatCar'}</h1><p>{register?'Start listing and exploring cars today.':'Access your listings and connect with the community.'}</p>
        <form onSubmit={submit} className="stack-form">{register&&<label>Display name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required minLength="2" maxLength="60"/></label>}
        <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" required minLength="6"/></label>{register&&<label>Confirm password<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat your password" required/></label>}{error&&<div className="alert" role="alert">{error}</div>}{success&&<div className="success" role="status">{success}</div>}<button disabled={busy} className="btn btn-dark full">{busy?'Please wait…':register?'Create account':'Log in'}</button></form><p className="auth-switch">{register?'Already have an account?':'New to BatCar?'} <Link to={register?'/login':'/register'}>{register?'Log in':'Create an account'}</Link></p></div></div>;
}
