import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from 'react-email';

interface VerificationEmailProps {
  email?: string;
  verifyCode?: number;
}

const VerificationEmail = ({
  email ,
  verifyCode,
}: VerificationEmailProps) => {
  const previewText = `Your verification code to login is ${verifyCode}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-black m-auto font-sans">
          <Container className="mb-10 mx-auto p-5 max-w-[465px]">
            <Section className="mt-10">
              <Img
                src={`https://example.com/brand/example-logo.png`}
                width="60"
                height="60"
                alt="Logo Example"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-2xl text-white font-normal text-center p-0 my-8 mx-0">
              Verification code email
            </Heading>
            {/* <Text className="text-start text-sm text-white">
              Hello {username},
            </Text> */}
            <Text className="text-start text-sm text-white leading-relaxed">
              Hey there! Your verification to log in to our platform in ${verifyCode}. Do not send this code with anyone, especially if you did not try to log in. Thanks.
            </Text>
            {/* <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="py-2.5 px-5 bg-white rounded-md text-black text-sm font-semibold no-underline text-center"
                href={`https://example.com/get-started`}
              >
                Get Started
              </Button>
            </Section> */}
            {/* <Text className="text-start text-sm text-white">
              Cheers,
              <br />
              The {company} Team
            </Text> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;