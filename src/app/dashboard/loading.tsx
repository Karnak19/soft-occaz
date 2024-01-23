import Spinner from '$/components/Spinner';

function Loading() {
  return (
    <div className="grid h-96 place-items-center">
      <Spinner />
      <p className="text-2xl font-semibold text-gray-500">Chargement...</p>
    </div>
  );
}

export default Loading;
