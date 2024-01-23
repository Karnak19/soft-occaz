import Spinner from './Spinner';

function AbsoluteBlurredSpinner({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur">
      <Spinner />
    </div>
  );
}

export default AbsoluteBlurredSpinner;
