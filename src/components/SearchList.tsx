'use client';

function SearchList() {
  return (
    <div className="mx-auto w-1080">
      <header>
        <p>{/* {data?.totalItems} résultats pour « {params.get('q')} » */}</p>
      </header>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        <span>this has been deactived for now, because it was not working properly</span>
        {/* {data?.items.map((ad) => (
          <li key={ad.id}>
            <ProductCard
              {...{
                href: `/annonces/details/${ad.id}`,
                ...ad,
              }}
            />
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default SearchList;
