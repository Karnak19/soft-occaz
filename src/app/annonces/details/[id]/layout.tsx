import ProductList from '$/components/ProductList';
import { getSingleAd } from '$/utils/getters/getSingleAd';

async function layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const ad = await getSingleAd(params.id);

  return (
    <div className="grid lg:grid-cols-[1fr,4fr]">
      <div>{children}</div>
      <aside className="lg:col-start-1 lg:row-start-1">
        <div className="pb-4 text-center">
          <p>
            Dernières annonces <span className="uppercase">{ad.type}</span>
          </p>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore Async server component */}
        <ProductList filter={`type = "${ad.type}"`} card="vertical" />
      </aside>
    </div>
  );
}

export default layout;
