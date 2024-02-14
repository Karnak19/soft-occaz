import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = 'https://airsoft-market.store';

type CreateRatingProps = {
  ratingSessionId: string;
  username: string;
  avatar: string | null;
  from: {
    username: string;
    avatar: string | null;
  };
};

export function CreateRating({
  ratingSessionId,
  username = 'supertotozor69',
  avatar = 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Kurt&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Wink&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Tanned',
  from = {
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=EyeRoll&eyebrowType=RaisedExcited&mouthType=Eating&skinColor=Yellow',
    username: 'jeantoto',
  },
}: CreateRatingProps) {
  return (
    <Html>
      <Head />
      <Preview>[Airsoft Market] Donner une évaluation</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[16px]">
            <Section className="pt-[32px]">
              <Img src={`${baseUrl}/logo.png`} width="50" height="50" alt="Airsoft Market" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 mb-0 mt-[30px] p-0 text-center text-[24px] font-bold text-black">
              Évaluer
              {!!from && <strong> {from.username}</strong>}
            </Heading>
            <Text className="mt-0 text-center text-gray-500">
              Veuillez prendre quelques instants pour évaluer votre expérience avec {from.username}.
            </Text>
            {!!avatar && !!from.avatar && (
              <Row>
                <Column>
                  <Img src={avatar} width="50" height="50" alt="Avatar" className="mx-auto my-0" />
                </Column>
                <Column>
                  <Text className="text-center text-4xl">🤝</Text>
                </Column>
                <Column>
                  <Img src={from.avatar} width="50" height="50" alt="Avatar" className="mx-auto my-0" />
                </Column>
              </Row>
            )}
            <Text className="mt-12 text-pretty">
              Bonjour {username} ! Vous avez récemment acheté un article sur Airsoft Market. Nous vous serions reconnaissants de
              bien vouloir prendre quelques instants pour évaluer votre expérience avec votre vendeur. Cela permet de créer un
              indice de confiance qui bénéficiera à toute la communauté !
            </Text>
            <Text className="mt-8 text-pretty">
              Il vous suffit de cliquer sur le bouton ci-dessous, cela vous mènera sur la page d&apos;évaluation de votre vendeur.
            </Text>
            <Section className="text-center">
              <Button
                className="mt-4 rounded border border-solid border-gray-300 bg-[#475a4d] px-6 py-3 leading-4 text-white"
                href={`${baseUrl}/dashboard/ratings?id=${ratingSessionId}`}
                target="_blank"
              >
                <StarIcon />
                <span className="font-semibold leading-4">Donner une évaluation</span>
              </Button>
            </Section>
            <Section>
              <Text className="mt-12 text-pretty">
                Merci pour votre temps et pour votre contribution à la communauté Airsoft Market.
              </Text>
              <Text className="text-pretty">L&apos;équipe Airsoft Market</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="-mb-1 mr-1"
      height={20}
      width={20}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

export default CreateRating;
