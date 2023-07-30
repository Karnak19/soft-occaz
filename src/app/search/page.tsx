import LastAds from '$/components/home/LastAds';
import SearchSection from '$/components/home/SearchSection';
import SearchList from '$/components/SearchList';

function Page({ searchParams }: { searchParams: { q: string } }) {
  return (
    <>
      <SearchSection withoutBg />
      <SearchList searchParams={searchParams} />
      <LastAds />
    </>
  );
}

export default Page;
