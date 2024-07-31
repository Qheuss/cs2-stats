import Header from '../../components/Header';
import SidePanel from './components/SidePanelInventory';
import SteamInventory from './components/SteamInventory';

const Page = () => {
  return (
    <>
      <Header />
      <section className='inventory'>
        <SidePanel />

        <div>
          <h1>Inventory</h1>
          <SteamInventory />
        </div>
      </section>
    </>
  );
};

export default Page;
