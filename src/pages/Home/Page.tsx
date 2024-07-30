import reactLogo from '../../assets/react.svg';
import Header from '../../components/Header';
import viteLogo from '/vite.svg';

const Page = () => {
  return (
    <>
      <Header />
      <a href='https://vitejs.dev' target='_blank'>
        <img src={viteLogo} className='logo' alt='Vite logo' />
      </a>
      <a href='https://react.dev' target='_blank'>
        <img src={reactLogo} className='logo react' alt='React logo' />
      </a>
    </>
  );
};

export default Page;
