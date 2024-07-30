import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to='/Inventory' relative='path'>
        Inventory
      </Link>
      <Link to='/Stats' relative='path'>
        Stats
      </Link>
    </header>
  );
};

export default Header;
