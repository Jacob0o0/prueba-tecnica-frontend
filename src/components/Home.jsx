import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

// =============== STYLE ==============
import '../styles/index.css';
import Catalogo from './Catalogo';
import Divider from './Divider';


const Home = () => {

    return(
        <main className='max-w-screen flex flex-col items-center'>
            <section className='container px-10 py-10 flex flex-col-reverse lg:flex-row items-center justify-center'>
                <div className='w-[100%] lg:max-w-[30%] mt-5 lg:mt-0 container space-y-10'>
                    <h1 className='text-5xl lg:text-4xl font-bold'>Bienvenido a Educa<span className='text-azulPrimario'>Tech</span></h1>
                    <h2 className='text-2xl lg:text-2xl font-medium text-justify'>Explora la variedad de contenido que tenemos para tu crecimiento tanto profesional como escolar</h2>
                </div>
                <div className=' lg:max-w-[60%]'>
                    <img className='h-[100%] rounded-xl' src="imgs/cover_home.png" alt="" />
                </div>
            </section>

            <div className='relative w-[100%] h-1'>
                <Divider></Divider>
            </div>

            <Catalogo></Catalogo>

            <section className='w-full pb-10 flex items-center justify-center bg-azulPrimario'>
                <section className='container px-10 py-10 flex flex-col items-center justify-center rounded-2xl'>
                    <p className='text-3xl mx-2 my-5 text-white font-semibold'>¡O aprende matemáticas con nuestro juego interactivo!</p>
                    <div className='w-[80%} relative lg:w-[60%] rounded-xl shadow-xl hover:scale-105'>
                        <Link className='absolute bottom-5 right-5 flex items-center border-naranjaPrimario border-4 bg-naranjaPrimario p-5 rounded-full shadow-xl hover:scale-125 hover:border-white'
                            to={'/videogame'}>
                            <i className="bi bi-play text-5xl text-white"></i>
                        </Link>
                        <img className='rounded-xl' src="/imgs/cajero.png" alt="" />
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Home;