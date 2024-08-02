import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SteamInventory from './components/SteamInventory';

const Page = () => {
  return (
    <>
      <Header />
      <section className='inventory'>
        <SteamInventory />
      </section>
      <Footer />
    </>
  );
};

export default Page;
