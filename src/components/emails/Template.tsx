import React from 'react';

interface EmailTemplateProps {
  title: string;
  rating: number;
  from: {
    username: string | null;
    avatar: string | null;
  };
}

export function EmailTemplate({ title, rating, from }: EmailTemplateProps) {
  return <div></div>;
}
