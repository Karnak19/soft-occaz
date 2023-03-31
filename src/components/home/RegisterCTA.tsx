import Link from 'next/link';

export default function RegisterCTA() {
  return (
    <div className="relative overflow-hidden isolate">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vendez votre équipement d&apos;airsoft en ligne.
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-lg leading-8 text-gray-600">
            Créez votre annonce, ajoutez une description, des photo, un prix et publiez-la en quelques clics.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-rg-light px-3.5 py-2.5  font-semibold text-gray-900 shadow-sm hover:bg-rg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              S&apos;inscrire
            </Link>
            <Link href="#" className="font-semibold leading-6 text-gray-900 ">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <svg
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7dd3fc" />
            <stop offset={1} stopColor="#0284c7" />
          </radialGradient>
        </defs>
      </svg> */}
    </div>
  );
}
