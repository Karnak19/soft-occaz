import AnimatedValue from '../AnimatedValue';

function AnimatedPrice({ price }: { price: number }) {
  return (
    <p className="text-lg font-bold font-roboto whitespace-nowrap">
      <AnimatedValue value={price} duration={price / 120} />€
    </p>
  );
}

export default AnimatedPrice;
