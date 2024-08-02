import { GiTakeMyMoney } from 'react-icons/gi';

interface SidePanelInventoryProps {
  onSortByQuality: () => void;
  isAscending: boolean;
}

const SidePanelInventory: React.FC<SidePanelInventoryProps> = ({
  onSortByQuality,
  isAscending,
}) => {
  return (
    <aside>
      <GiTakeMyMoney />
      <h2>Sort by</h2>
      <ul>
        <li>Price</li>
        <li onClick={onSortByQuality}>
          Quality ({isAscending ? 'Ascending' : 'Descending'})
        </li>
        <li>Types</li>
        <li>Names</li>
      </ul>
    </aside>
  );
};

export default SidePanelInventory;
