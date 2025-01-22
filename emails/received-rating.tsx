import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReceivedRatingProps {
  username: string;
  rating: number;
  comment: string;
  from: {
    avatar?: string;
    username: string;
  };
}

export default function ReceivedRating({ username, from, rating, comment }: ReceivedRatingProps) {
  return (
    <Html>
      <Head />
      <Preview>Vous avez reçu une nouvelle note sur Airsoft-Market</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img src="https://airsoftmarket.fr/logo.png" width="40" height="40" alt="Airsoft-Market" />
          </Section>
          <Section style={content}>
            <Heading style={heading}>Bonjour {username},</Heading>
            <Section style={messageBox}>
              <Section style={userInfo}>
                {from?.avatar && <Img src={from.avatar} width="40" height="40" alt={from.username} style={avatarStyle} />}
                <div>
                  <Text style={senderName}>{from?.username || 'Un utilisateur'}</Text>
                  <Text style={timestamp}>{format(new Date(), 'dd MMMM yyyy', { locale: fr })}</Text>
                </div>
              </Section>
              <Text style={messageText}>{from.username} vous a donné une note suite à votre transaction.</Text>
              <Section style={ratingBox}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Img
                    key={star}
                    src={`https://airsoftmarket.fr/images/star-${star <= rating ? 'filled' : 'empty'}.png`}
                    width="32"
                    height="32"
                    alt={`${star} étoile${star > 1 ? 's' : ''}`}
                  />
                ))}
              </Section>
              <Section style={commentBox}>
                <Text style={commentText}>&ldquo;{comment}&rdquo;</Text>
              </Section>
              <Link href="https://airsoftmarket.fr/dashboard/ratings" style={button}>
                Voir mon profil
              </Link>
            </Section>
            <Text style={footer}>L&apos;équipe d&apos;Airsoft-Market</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f7f6',
  fontFamily: 'Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '100%',
  maxWidth: '600px',
};

const logo = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#3b4a40',
  margin: '0 0 24px',
};

const messageBox = {
  backgroundColor: '#f6f7f6',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
};

const userInfo = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  marginBottom: '16px',
};

const avatarStyle = {
  borderRadius: '50%',
  marginRight: '12px',
} as const;

const senderName = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#3b4a40',
  margin: '0',
};

const timestamp = {
  fontSize: '14px',
  color: '#758c7c',
  margin: '4px 0 0',
};

const messageText = {
  fontSize: '16px',
  color: '#475a4d',
  margin: '0 0 24px',
  lineHeight: '1.5',
};

const ratingBox = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: '8px',
  marginBottom: '24px',
};

const commentBox = {
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  padding: '16px',
  marginBottom: '24px',
  borderLeft: '4px solid #5a7161',
};

const commentText = {
  fontSize: '16px',
  color: '#475a4d',
  margin: '0',
  lineHeight: '1.5',
  fontStyle: 'italic',
};

const button = {
  backgroundColor: '#5a7161',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const footer = {
  fontSize: '14px',
  color: '#758c7c',
  margin: '32px 0 0',
  textAlign: 'center' as const,
};

ReceivedRating.PreviewProps = {
  username: 'John Doe',
  rating: 4,
  comment: "Très bon vendeur, réactif et sérieux. L'article était conforme à la description. Je recommande !",
  from: {
    username: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
};
