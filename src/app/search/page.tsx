import LastAds from '$/components/home/LastAds';
import SearchSection from '$/components/home/SearchSection';
import SearchList from '$/components/SearchList';

function Page() {
  return (
    <>
      <SearchSection withoutBg />
      <SearchList />
      <LastAds />
    </>
  );
}

export default Page;
