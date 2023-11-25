import React from 'react'
import { MdLogin } from 'react-icons/md'
function Header() {
    return (
        <>
            <nav>
                <div className="container mb-4 px-6 py-2 flex justify-between bg-gray-400 items-center">
                    <a className="font-bold text-xl lg:text-xl" href="/">
                        Dailype
                    </a>
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:block">
                        <div className='inline-flex'>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" className='rounded-full mx-1.5' alt="profile-pic" width={40} height={40} />
                            <p className='text-xl font-medium'>Rajan kumar</p>
                            <p className='text-xl my-1 mx-1'><MdLogin /></p>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header