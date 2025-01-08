import SearchList from '$/components/SearchList';
import LastAds from '$/components/home/LastAds';

function Page({ searchParams }: { searchParams: { q: string } }) {
  return (
    <>
      <SearchList searchParams={searchParams} />
      <LastAds />
    </>
  );
}

export default Page;
