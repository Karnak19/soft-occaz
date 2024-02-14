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
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface NewChatProps {
  username: string;
  from?: {
    username?: string;
    avatar?: string;
  };
}

const DEFAULT_PROPS: NewChatProps = {
  username: 'coucou',
  from: {
    username: 'jeantoto',
    avatar: 'https://airsoft-market.store/logo.png',
  },
};

const defaultAvatar = 'https://airsoft-market.store/logo.png';

const baseUrl = 'https://airsoft-market.store';

// re_HCyzw8h4_45v12iunHhdUxMQkPx6V9ww9
export function NewChat({ username = DEFAULT_PROPS.username, from }: NewChatProps) {
  const inviteLink = `${baseUrl}/dashboard/chats`;
  return (
    <Html>
      <Head />
      <Preview>[Airsoft Market] Nouveau message</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img src={`${baseUrl}/logo.png`} width="40" height="37" alt="Vercel" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Vous avez reçu un nouveau message
              {!!from && (
                <>
                  {' '}
                  de <strong> {from.username}</strong>
                </>
              )}
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {username},</Text>
            {!!from && (
              <Text className="text-[14px] leading-[24px] text-black">
                <strong>{from.username}</strong> vous a envoyé un message sur <strong>Airsoft Market</strong>.
              </Text>
            )}
            <Section>
              <Row>
                <Column align="center">
                  {!!from?.avatar ? (
                    <Img className="rounded-full" src={from.avatar} width="64" height="64" />
                  ) : (
                    <Img className="rounded-full" src={defaultAvatar} width="64" height="64" />
                  )}
                </Column>
              </Row>
            </Section>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Consulter
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              ou copier/coller dans votre navigateur:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default NewChat;
