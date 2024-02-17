import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BaseEmailTemplateProps {
  title: string;
  from: {
    username: string | null;
    avatar: string | null;
  };
}

interface NewRatingEmailTemplateProps extends BaseEmailTemplateProps {
  rating: number;
}

interface NewPrivateMessageEmailTemplateProps extends BaseEmailTemplateProps {}

export function NewRatingEmailTemplate({ title, rating, from }: NewRatingEmailTemplateProps) {
  return (
    <div className="font-roboto">
      <div className="bg-rg-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="size-10 rounded-full object-cover"
              src={from.avatar || '/images/avatar-placeholder.png'}
              alt={from.username || 'Anonyme'}
            />
            <div>
              <div className="font-semibold">{from.username || 'Anonyme'}</div>
              <div className="text-xs">a noté votre annonce</div>
            </div>
          </div>
          <div className="text-xs">{format(new Date(), 'dd/MM/yyyy', { locale: fr })}</div>
        </div>
        <div className="text-2xl font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl text-rg-300">{rating}</div>
          <div className="text-2xl text-rg-300">/ 5</div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="text-primary">Merci pour votre confiance !</div>
        <div className="text-primary">L&apos;équipe de Airsoft-Market</div>
      </div>
    </div>
  );
}

export function NewPrivateMessageTemplate({ title, from }: NewPrivateMessageEmailTemplateProps) {
  return (
    <div className="font-roboto">
      <div className="bg-rg-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="size-10 rounded-full object-cover"
              src={from.avatar || '/images/avatar-placeholder.png'}
              alt={from.username || 'Anonyme'}
            />
            <div>
              <div className="font-semibold">{from.username || 'Anonyme'}</div>
              <div className="text-xs">vous a envoyé un message privé</div>
            </div>
          </div>
          <div className="text-xs">{format(new Date(), 'dd/MM/yyyy', { locale: fr })}</div>
        </div>
        <div className="text-2xl font-semibold">{title}</div>
      </div>
      <div className="bg-white p-4">
        <div className="text-primary">Merci pour votre confiance !</div>
        <div className="text-primary">L&apos;équipe de Airsoft-Market</div>
      </div>
    </div>
  );
}
