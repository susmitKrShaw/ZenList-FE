import ZenListLogo from '../assets/ZenListLogo.svg';
import { useNavigate } from 'react-router-dom';  

export function Welcome(){
    const navigate = useNavigate();
    function signup(){signin
        navigate("/signup");
    }
    function signin(){
        navigate("/signin");
    }

    return(
        <div>
            <div className="h-screen w-full bg-slate-200 flex items-center ">
            <div className="pl-[20vw] flex">
                <div className="w-[30vw] h-[70vh] bg-orange-500 flex items-center border-l shadow-lg rounded-s-xl overflow-auto">
                    <div className="text-white flex justify-center">
                        <div className='text-3xl pl-48'>
                        <div className='mb-3'>ZenList</div>
                        <div className='mb-3 opacity-90'>ZenList</div>
                        <div className='mb-3 opacity-80'>ZenList</div>
                        <div className='mb-3 opacity-70'>ZenList</div>
                        <div className='mb-3 opacity-60'>ZenList</div>
                        <div className='mb-3 opacity-50'>ZenList</div>
                        <div className='mb-3 opacity-40'>ZenList</div>
                        <div className='mb-3 opacity-30'>ZenList</div>
                        <div className='mb-3 opacity-20'>ZenList</div>
                        <div className='mb-3 opacity-10'>ZenList</div>
                                                </div>
                    </div>
                </div>
                <div className="bg-white w-[30vw] h-[70vh] flex items-center border-r shadow-lg rounded-e-xl text-orange-500 overflow-auto">
                    <div className="pl-12">
                        <div className='flex items-center text-4xl pl-20 mb-12'>
                        <img src={ZenListLogo} alt="ZenList Logo" className="h-20"/>
                        <div className='font-bold'>ZenList</div>
                        </div>
                        <div className='text-3xl mb-10'>
                            Welcome to the future of Task <span className='pl-28'>Management</span>
                        </div>
                        <div className='text-2xl'>
                        A minimal and mindful approach to <span className='pl-32'>manage tasks.</span> 
                        </div>
                        <div className='flex pl-20 mt-6 text-white'>
                            <button onClick={signup} className='bg-orange-500 px-6 py-2 rounded-xl  mt-2 mr-4 transition-all hover:bg-orange-300'>Sign Up</button>
                            <button onClick={signin} className='bg-orange-500 px-6 py-2 rounded-xl  mt-2 transition-all hover:bg-orange-300'>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}