import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden pt-14">
      <Image src="/hero.png" fill alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-80" />
      <div className="absolute inset-0 -z-10 size-full bg-gradient-to-t from-background object-cover" />
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Airsoft Market - Trouvez, échangez, vendez
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground dark:text-card-foreground">
            La meilleure plateforme française 🇫🇷 d&apos;échange de matériel airsoft d&apos;occasion.
          </p>
        </div>
      </div>
    </div>
  );
}
