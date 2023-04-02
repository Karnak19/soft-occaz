import Spinner from '$/components/Spinner';

function Loading() {
  return (
    <div className="grid place-items-center h-96">
      <Spinner />
      <p className="text-2xl font-semibold text-gray-500">Chargement...</p>
    </div>
  );
}

export default Loading;
