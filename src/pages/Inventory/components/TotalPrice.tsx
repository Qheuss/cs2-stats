interface TotalPriceProps {
  TotalPrice: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ TotalPrice }) => {
  return <span>{TotalPrice} €</span>;
};

export default TotalPrice;
