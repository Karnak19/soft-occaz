import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react';

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
      <div className="bg-rg-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full object-cover"
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
        <div className="text-rg-500">Merci pour votre confiance !</div>
        <div className="text-rg-500">L&apos;équipe de Airsoft-Market</div>
      </div>
    </div>
  );
}

export function NewPrivateMessageTemplate({ title, from }: NewPrivateMessageEmailTemplateProps) {
  return (
    <div className="font-roboto">
      <div className="bg-rg-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full object-cover"
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
        <div className="text-rg-500">Merci pour votre confiance !</div>
        <div className="text-rg-500">L&apos;équipe de Airsoft-Market</div>
      </div>
    </div>
  );
}
