import React from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  return (
    <main className='max-w-screen min-h-screen py-10 flex flex-col items-center bg-azulPrimario'>
        <section className='container flex flex-col items-center text-center px-8 gap-10'>
            <h1 className='text-5xl text-white font-bold'>¡Aprende a sumar con nuestro juego interactivo!</h1>
            <h2 className='text-3xl text-white font-medium'>¿Hasta donde podrás llegar?</h2>

            <Link className='flex items-center border-naranjaPrimario border-4 bg-naranjaPrimario p-5 rounded-full shadow-xl hover:scale-125 hover:border-white'
                to={'/videogame/play'}>
                <i className="bi bi-play text-5xl text-white"></i>
            </Link>

            <ul className='flex flex-col md:flex-row gap-4'>
                <li className='bg-white text-5xl px-10 py-5 rounded-md'>
                    1
                </li>
                <li className='bg-red-500 text-5xl px-10 py-5 rounded-md'>
                    2
                </li>
                <li className='bg-red-500 text-5xl px-10 py-5 rounded-md'>
                    3
                </li>
                <li className='bg-red-500 text-5xl px-10 py-5 rounded-md'>
                    4
                </li>
                <li className='bg-red-500 text-5xl px-10 py-5 rounded-md'>
                    5
                </li>
            </ul>
        </section>
    </main>
  )
}

export default HomeScreen