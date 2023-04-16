'use client';

import { useQuery } from '@tanstack/react-query';

import CreateAdForm from '$/components/CreateAdForm';
import { usePocket } from '$/components/PocketContext';
import { AnnoncesResponse, Collections } from '$/utils/pocketbase-types';

function Page({ params }: { params: { id: string } }) {
  const { pb } = usePocket();

  const { data } = useQuery({
    queryKey: ['annonces', params.id],
    queryFn: () => pb.collection(Collections.Annonces).getOne<AnnoncesResponse>(params.id),
  });

  return <CreateAdForm edit={data} />;
}

export default Page;
