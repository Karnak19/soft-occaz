import * as React from 'react';
import {
  Tailwind,
  Section,
  Row,
  Column,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
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
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img src={`${baseUrl}/logo.png`} width="40" height="37" alt="Vercel" className="my-0 mx-auto" />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Vous avez reçu un nouveau message
              {!!from && (
                <>
                  {' '}
                  de <strong> {from.username}</strong>
                </>
              )}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hello {username},</Text>
            {!!from && (
              <Text className="text-black text-[14px] leading-[24px]">
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
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5"
                href={inviteLink}
              >
                Consulter
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
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
