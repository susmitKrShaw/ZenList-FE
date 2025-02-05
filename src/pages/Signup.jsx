import { forwardRef, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Signup(){

    const navigate = useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const signupRef = useRef();

    useEffect(()=>{
        usernameRef.current.focus();
    },[])

    async function userSignup(){ 
        try {
            if (!usernameRef.current.value || 
                !emailRef.current.value || 
                !passwordRef.current.value) {
                alert("Please fill in all fields");
                return;
            }

            const username = usernameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;  
            
            const response = await axios.post("http://localhost:3000/signup",{
                username,
                email,
                password
            })
            alert(response.data.message);

            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            usernameRef.current.focus();

            navigate("/signin");

            } catch (error) {
                if(error.response){
                    alert(error.response.data.message);
                }else{
                    alert("An error occurred during signup");
                }
            }    
    }

    const handleKeyPress = (currentRef, nextRef) => (event) => {
        if(event.key === "Enter" && currentRef.current?.value !== ""){
            event.preventDefault();
            if(currentRef === passwordRef){
                signupRef.current.focus();
                userSignup();
                usernameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
            }else if(nextRef.current){
                nextRef.current.focus();   
            }
        }
    }

    return(
        <div className="h-screen w-full bg-slate-200 flex items-center ">
            <div className="pl-[20vw] pr-[20vw] flex">
                <div className="w-[30vw] h-[70vh] bg-orange-500 flex items-center border-l shadow-lg rounded-s-xl">
                    <div className="text-white flex justify-center">
                        <div className="pl-6">
                        <div className="mr-2 pl-6 mb-1">
                            <span className="text-4xl pr-2">Welcome</span><span className="2xl pr-1">To </span><span className="text-4xl">ZenList</span>
                        </div>
                        <div className="text-sm flex justify-center">
                        A minimal and mindful approach to task management
                        </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[30vw] h-[70vh] flex items-center border-r shadow-lg rounded-e-xl">
                    <div className="pl-8">
                        <div className="text-3xl mb-3 flex justify-center">Create Account</div>
                        <InputEl ref={usernameRef} placeholder="UserName" onKeyPress={handleKeyPress(usernameRef,emailRef)} />
                        <InputEl ref={emailRef} placeholder="Email" onKeyPress={handleKeyPress(emailRef, passwordRef)}/>
                        <InputEl ref={passwordRef} placeholder="Password" onKeyPress={handleKeyPress(passwordRef,signupRef)}/>
                        <div className="flex justify-center"><button ref={signupRef} onClick={userSignup} className="bg-orange-500 px-6 py-2 rounded-xl  mt-2 transition-all hover:bg-orange-300 ">Sign Up</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const InputEl = forwardRef(function InputEl({placeholder, onKeyPress}, ref){
    return(
        <div>
            <input ref={ref} type="text" placeholder={placeholder} className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2" onKeyPress={onKeyPress} />
        </div>
    )
});



{/* <div><input type="text" className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div>
<div><input type="text" placeholder="Email" className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div>
<div><input type="text" placeholder="Password"className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div> */}

