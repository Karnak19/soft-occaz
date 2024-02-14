import * as React from 'react';
import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind } from '@react-email/components';

const baseUrl = 'https://airsoft-market.store';

export function NewRating() {
  return (
    <Html>
      <Head />
      <Preview>[Airsoft Market] Nouvelle évaluation</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img src={`${baseUrl}/logo.png`} width="40" height="37" alt="Vercel" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Vous avez reçu une nouvelle évaluation
              {/* {!!from && (
                <>
                  {' '}
                  de <strong> {from.username}</strong>
                </>
              )} */}
            </Heading>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default NewRating;
