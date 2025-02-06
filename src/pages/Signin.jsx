import { forwardRef, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export function Signin(){

    const navigate = useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const signinRef = useRef();

    useEffect(()=>{
        usernameRef.current.focus();
    },[])

    async function userSignin(){ 
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
            
            const response = await axios.post(`${BACKEND_URL}/signin`,{
                username,
                email,
                password
            })
            alert(response.data.message);

            const jwt = response.data.token ;
            localStorage.setItem("token", jwt) ;  

            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";

            usernameRef.current.focus();

            navigate("/dashboard");

            } catch (error) {
                if(error.response){
                    alert(error.response.data.message);
                }else{
                    alert("An error occurred during signin");
                }
            }    
    }

    const handleKeyPress = (currentRef, nextRef) => (event) => {
        if(event.key === "Enter" && currentRef.current?.value !== ""){
            event.preventDefault();
            if(currentRef === passwordRef){
                signinRef.current.focus();
                userSignin();
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
                        <div className="mr-2 pl-6 mb-1 flex justify-center">
                            <div className="text-4xl">
                            Welcome Back
                            </div>
                        </div>
                        <div className="text-sm flex justify-center">
                        To access your tasks, please login with you credentials
                        </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[30vw] h-[70vh] flex items-center border-r shadow-lg rounded-e-xl">
                    <div className="pl-8">
                        <div className="text-3xl mb-3 flex justify-center">Sign In</div>
                        <InputEl ref={usernameRef} placeholder="UserName" onKeyPress={handleKeyPress(usernameRef,emailRef)} />
                        <InputEl ref={emailRef} placeholder="Email" onKeyPress={handleKeyPress(emailRef, passwordRef)}/>
                        <InputEl ref={passwordRef} placeholder="Password" onKeyPress={handleKeyPress(passwordRef,signinRef)}/>
                        <div className="flex justify-center"><button ref={signinRef} onClick={userSignin} className="bg-orange-500 px-6 py-2 rounded-xl  mt-2 transition-all hover:bg-orange-300 ">Sign In</button></div>
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





{/* <div className="bg-white w-[30vw] h-[70vh] flex items-center border-r shadow-lg rounded-e-xl">
                    <div className="pl-8">
                        <div className="text-3xl mb-3 flex justify-center">Sign In</div>
                        <div><input type="text" placeholder="UserName"className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div>
                        <div><input type="text" placeholder="Email" className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div>
                        <div><input type="text" placeholder="Password"className="bg-slate-200 rounded-lg w-[25vw] h-9 mb-4 pl-2"/></div>
                        <div className="flex justify-center"><button onClick={userSignin} className="bg-orange-500 px-6 py-2 rounded-xl  mt-2 transition-all hover:bg-orange-300 ">Sign In</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
} */}

