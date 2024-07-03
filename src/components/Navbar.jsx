import {React} from 'react';
import {Link} from "react-router-dom";

// =============== STYLE ==============
import '../styles/index.css';


const Navbar = () => {
    return(
        <nav className="h-20 p-5 sticky top-0 flex flex-row items-center justify-between bg-white z-20 rounded-b-lg">
            <Link className='h-10 rounded-lg bg-white hover:scale-110' to={'/'}>
                <img className='h-10 object-cover rounded-xl' src="/imgs/EducaTech-logo-sm.png" alt="Logo EducaTech" />
            </Link>

            <ul className='hidden sm:flex flex-row items-center space-x-5 text-xl font-semibold text-azulPrimario'>
                <li className='py-2 px-3 rounded-lg hover:scale-110'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='py-2 px-3 rounded-lg hover:scale-110'>
                    <Link to='/#cursos'>Cursos</Link>
                </li>
                <li className='py-2 px-3 rounded-lg hover:scale-110'>
                    <a href="#">Contacto</a>
                </li>

                <Link to={'/admin_contenidos'}>
                    <img className='h-10 rounded-full border-azulPrimario border-2 hover:scale-110' src="/imgs/empty-person.png" alt="Dashboard" />
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar