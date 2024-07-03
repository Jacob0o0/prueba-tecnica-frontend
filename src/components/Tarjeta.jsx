import React from 'react';
import { Link } from 'react-router-dom';

// =============== STYLE ==============
import '../styles/index.css';

const Tarjeta = ({ id, titulo, thumbnail, area_conocimiento, descripcion, created_at }) => {
    return (
      <Link className="col-span-3 lg:col-span-1"
            to={`/publicacion/${id}`}>
        <div className='h-[405px] flex flex-col rounded-lg shadow-md hover:shadow-lg hover:scale-105'>
            <div className='relative w-[100%]'>
                <img className='h-60 w-[100%] rounded-lg object-cover' src={thumbnail} alt="Thumbnail" />
                <div className='absolute bottom-3 right-3 px-3 py-2 text-white font-semibold bg-azulPrimario rounded-md'>
                    <p>{area_conocimiento}</p>
                </div>
            </div>
            <div className='p-3 space-y-1'>
                <h2 className='text-xl font-bold'>{titulo}</h2>
                <div className='flex'>
                    <p className='px-2 py-1 flex rounded-lg bg-gray-300 text-black font-medium'><small>{created_at}</small></p>
                </div>
                <p>{descripcion}</p>
            </div>
        </div>
      </Link>
    );
  };
  
  export default Tarjeta;