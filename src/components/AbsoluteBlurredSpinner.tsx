import Spinner from './Spinner';

function AbsoluteBlurredSpinner({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute z-20 inset-0 flex items-center justify-center backdrop-blur">
      <Spinner />
    </div>
  );
}

export default AbsoluteBlurredSpinner;
