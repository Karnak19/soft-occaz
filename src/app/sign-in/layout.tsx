import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col items-center space-y-2 text-center">
        <Image src="/logo.png" alt="Airsoft Market" width={40} height={40} className="mb-2" />
        <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
        <p className="text-sm text-muted-foreground">Connectez-vous pour accéder à votre compte et gérer vos annonces.</p>
      </div>
      {children}
    </div>
  );
}
