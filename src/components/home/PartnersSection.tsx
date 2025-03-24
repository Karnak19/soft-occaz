import { cn } from '$/utils/cn';
import type { PartnersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import Image from 'next/image';
import Link from 'next/link';

async function getPartners(): Promise<PartnersResponse[]> {
  const pb = await createStaticClient();
  const partners = await pb.collection('partners').getFullList({
    sort: 'name',
  });
  return partners;
}

async function getPartnerLogoUrl(partner: PartnersResponse): Promise<string> {
  if (!partner.logo) return '';

  const pb = await createStaticClient();
  return pb.files.getURL(partner, partner.logo, { thumb: '200x200' });
}

export async function PartnersSection() {
  const partners = await getPartners();

  if (partners.length === 0) {
    return null;
  }

  // Pre-fetch all logo URLs to avoid waterfall requests
  const partnerLogoUrls = new Map<string, string>();
  await Promise.all(
    partners.map(async (partner) => {
      if (partner.logo) {
        const url = await getPartnerLogoUrl(partner);
        partnerLogoUrls.set(partner.id, url);
      }
    }),
  );

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Nos Partenaires</h2>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-12 items-center justify-center">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} logoUrl={partnerLogoUrls.get(partner.id) || ''} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  partner,
  logoUrl,
  index,
}: {
  partner: PartnersResponse;
  logoUrl: string;
  index: number;
}) {
  // Apply staggered animation delay based on index
  const animationDelay = `${0.1 + index * 0.05}s`;

  return (
    <Link
      href={partner.href || '#'}
      target={partner.href ? '_blank' : undefined}
      className={cn(
        'group relative flex h-32 w-full max-w-[200px] items-center justify-center overflow-hidden rounded-lg bg-background p-4 shadow-md transition-all duration-300 hover:shadow-lg opacity-0 animate-fade-in',
        partner.href ? 'hover:-translate-y-1 hover:shadow-primary/10' : 'cursor-default',
      )}
      style={{ animationDelay }}
    >
      {partner.logo && logoUrl ? (
        <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
          <Image src={logoUrl} alt={partner.name || 'Logo partenaire'} fill className="object-contain" />

          {/* Show name on hover if displayName is true */}
          {partner.displayName && (
            <div className="absolute -inset-4 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium text-white text-center px-2">{partner.name}</span>
            </div>
          )}
        </div>
      ) : (
        <span className="text-lg font-semibold transition-transform duration-300 group-hover:scale-105">{partner.name}</span>
      )}
      {partner.href && (
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-3 px-3 py-1 rounded-full bg-primary/90 text-xs font-medium text-white">Visiter</span>
        </div>
      )}
    </Link>
  );
}
