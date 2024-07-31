import { Link } from 'react-router-dom';
import { SiCounterstrike } from 'react-icons/si';
import { FaUserTie } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <div className='container'>
        <a href='/'>
          <SiCounterstrike />
        </a>
        <nav>
          <ul>
            <li>
              <Link to='/Inventory' relative='path'>
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
        <FaUserTie />
      </div>
    </header>
  );
};

export default Header;
