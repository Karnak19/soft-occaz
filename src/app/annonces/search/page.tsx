import LastAds from '$/components/home/LastAds';
import SearchList from '$/components/SearchList';

function Page({ searchParams }: { searchParams: { q: string } }) {
  return (
    <>
      <SearchList searchParams={searchParams} />
      <LastAds />
    </>
  );
}

export default Page;
