
import { VerificationEmailProps } from '@/types/resend.types';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from '@react-email/components';



export const VerificationEmail = ({ email, otp }: VerificationEmailProps) => {

  return (
    <Html lang="en" dir="ltr">
      <Preview>Verification OTP</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl shadow-lg max-w-[600px] mx-auto">
            {/* Header */}
            <Section className="bg-green-600 text-white text-center py-8 rounded-t-xl">
              <Heading className="text-[32px] font-bold m-0 mb-2">🌱 Agri-Grocer</Heading>
              <Text className="text-[16px] m-0 opacity-90">Fresh from Farm to Your Table</Text>
            </Section>

            {/* Main Content */}
            <Section className="px-8 py-10">
              <Heading className="text-[24px] font-bold text-gray-800 mb-6 text-center">
                Verify Your Email Address {email}
              </Heading>
              
              <Text className="text-[16px] text-gray-600 mb-6 leading-6">
                Welcome to Agri-Grocer! We're excited to have you join our community of fresh produce enthusiasts.
              </Text>
              
              <Text className="text-[16px] text-gray-600 mb-6 leading-6">
                To complete your account setup and start exploring our fresh, locally-sourced agricultural products, 
                Below is the OTP for Email Verification:
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-8">
                <Button
                  className="bg-green-200 border border-green-500 text-black px-8 py-4 rounded-xl text-2xl font-semibold no-underline box-border"
                >
                  {otp}
                </Button>
              </Section>


              <Hr className="border-gray-200 my-6" />

              <Text className="text-[14px] text-gray-500 mb-4 leading-5">
                <strong>What's next?</strong> Once verified, you'll be able to:
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-2 ml-4">• Browse fresh, seasonal produce from local farms</Text>
              <Text className="text-[14px] text-gray-600 mb-2 ml-4">• Track your orders from harvest to delivery</Text>
              <Text className="text-[14px] text-gray-600 mb-2 ml-4">• Access exclusive deals and seasonal offers</Text>
              <Text className="text-[14px] text-gray-600 mb-6 ml-4">• Connect directly with local farmers and suppliers</Text>

              <Text className="text-[14px] text-gray-500 leading-5">
                This OTP will expire in 5 minutes for security purposes. If you didn't create an account with Agri-Grocer, 
                you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-8 py-6 rounded-b-xl border-t border-gray-200">
              <Text className="text-[12px] text-gray-500 text-center mb-4 m-0">
                Need help? Contact our support team at support@agri-grocer.com
              </Text>
              
              <Hr className="border-gray-200 my-4" />
              
              <Text className="text-[12px] text-gray-400 text-center m-0">
                Agri-Grocer, 123 Farm Fresh Lane, Agricultural District, Kolkata, WB 700001, India
              </Text>
              
              <Text className="text-[12px] text-gray-400 text-center mt-2 m-0">
                © 2024 Agri-Grocer. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
