import Script from 'next/script';

const inFeedAnnonceTypes = {
  block: {
    'data-ad-slot': '1827270105',
    'data-ad-layout-key': '+22+s2-10-1k+6v',
    'data-ad-format': 'fluid',
  },
  list: {
    'data-ad-slot': '6639816921',
    'data-ad-layout-key': '-gm+p-h-g0+v2',
    'data-ad-format': 'fluid',
  },
  'bloc-test': {
    'data-ad-slot': '6060166763',
    'data-ad-format': 'auto',
    'data-full-width-responsive': 'true',
  },
};

type GoogleAdType = keyof typeof inFeedAnnonceTypes;

function GoogleAd({ type }: { type: GoogleAdType }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7044834303541905"
        crossOrigin="anonymous"
      />
      <ins
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="adsbygoogle block"
        data-ad-test="on"
        data-ad-client="ca-pub-7044834303541905"
        {...inFeedAnnonceTypes[type]}
      ></ins>
      <Script
        id="google-adsense"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </>
  );
}

export default GoogleAd;
