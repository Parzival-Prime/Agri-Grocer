import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import { PasswordResetEmailProps } from '@/types/resend.types';


export const PasswordResetEmail = ({email, otp}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your Agri-Grocer password</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl shadow-sm max-w-[580px] mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-green-700 m-0 mb-2">
                🌱 Agri-Grocer
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Fresh from Farm to Your Table
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Heading className="text-[24px] font-bold text-gray-900 mb-4">
                Reset Your Password
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-4 leading-6">
                Hello there! 👋
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-4 leading-6">
                We received a request to reset the password for your Agri-Grocer account associated with <strong>{email}</strong>.
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-6 leading-6">
                Below is your Verification OTP: 
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-8">
                <Button
                  className="bg-green-200 border border-green-500 text-black px-8 py-4 rounded-xl text-[16px] font-semibold no-underline box-border inline-block"
                >
                  <strong>{otp}</strong>
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-4 leading-5">
                This otp will expire in 5 minutes for your security.
              </Text>
              
            </Section>

            {/* Security Notice */}
            <Section className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
              <Heading className="text-[16px] font-bold text-orange-800 mb-2">
                🔒 Security Notice
              </Heading>
              <Text className="text-[14px] text-orange-700 mb-2 leading-5">
                • If you didn't request this password reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-orange-700 mb-2 leading-5">
                • Never share your password with anyone
              </Text>
              <Text className="text-[14px] text-orange-700 m-0 leading-5">
                • This otp expires in 5 hours
              </Text>
            </Section>

            {/* Support */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 mb-4 leading-6">
                Need help? Our customer support team is here to assist you with any questions about your account or our fresh produce selection.
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-2 leading-6">
                Contact us at: <Link href="mailto:support@agri-grocer.com" className="text-green-600 underline">support@agri-grocer.com</Link>
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-4 leading-6">
                Happy shopping! 🥕🍅🌽
              </Text>
              
              <Text className="text-[16px] text-gray-700 m-0 leading-6">
                Best regards,<br />
                The Agri-Grocer Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-[12px] text-gray-500 text-center mb-2 m-0">
                Agri-Grocer - Connecting Farmers with Consumers
              </Text>
              <Text className="text-[12px] text-gray-500 text-center mb-2 m-0">
                123 Farm Fresh Lane, Green Valley, Agriculture District 560001
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <Link href="https://agri-grocer.com/unsubscribe" className="text-gray-500 underline">
                  Unsubscribe
                </Link> | 
                <Link href="https://agri-grocer.com/privacy" className="text-gray-500 underline ml-1">
                  Privacy Policy
                </Link> | 
                <Link href="https://agri-grocer.com" className="text-gray-500 underline ml-1">
                  Visit Website
                </Link>
              </Text>
              <Text className="text-[12px] text-gray-500 text-center mt-2 m-0">
                © 2024 Agri-Grocer. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};