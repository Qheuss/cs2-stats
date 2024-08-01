import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SidePanel from './components/SidePanelInventory';
import SteamInventory from './components/SteamInventory';

const Page = () => {
  return (
    <>
      <Header />
      <section className='inventory'>
        <SidePanel />
        <div className='inventoryList'>
          <h1>Inventory</h1>
          <SteamInventory />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
