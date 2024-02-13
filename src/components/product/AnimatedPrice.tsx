import AnimatedValue from '../AnimatedValue';

function AnimatedPrice({ price }: { price: number }) {
  return (
    <p className="whitespace-nowrap font-roboto text-lg font-bold">
      <AnimatedValue value={price} duration={price / 500} /> €
    </p>
  );
}

export default AnimatedPrice;
