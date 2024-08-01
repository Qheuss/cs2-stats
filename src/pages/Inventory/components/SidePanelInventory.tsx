import { GiTakeMyMoney } from 'react-icons/gi';

const SidePanelInventory = () => {
  return (
    <aside>
      <GiTakeMyMoney />
      <h2>Sort by</h2>
      <ul>
        <li>Price</li>
        <li>Quality</li>
        <li>Types</li>
        <li>Names</li>
      </ul>
    </aside>
  );
};

export default SidePanelInventory;
