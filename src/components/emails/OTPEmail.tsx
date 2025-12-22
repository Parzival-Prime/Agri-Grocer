import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from '@react-email/components';
import { VerificationEmailProps } from '@/types/resend.types';

export default function OTPEmail({
  email = "dvnhrajput@gmail.com",
  otp = ["1", "2", "3", "4", "5", "6"],
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your OTP code for Agri-Grocer</Preview>
      <Tailwind>
        <Body className="bg-green-50 font-sans py-10">
          <Container className="bg-white rounded-[12px] px-8 py-10 mx-auto max-w-[600px] shadow-lg">
            <Section>
              <Heading className="text-[32px] font-bold text-emerald-700 text-center mb-2 m-0">
                🌱 Agri-Grocer
              </Heading>
              <Text className="text-[14px] text-emerald-600 text-center mb-8 m-0 font-medium">
                Fresh • Organic • Delivered
              </Text>

              <Heading className="text-[24px] font-bold text-gray-800 mb-4 m-0">
                Verify Your Account
              </Heading>

              <Text className="text-[16px] text-gray-700 mb-8 m-0 leading-6">
                Use the following One-Time Password (OTP) to complete your verification:
              </Text>

              <Section className="py-6 mb-8 text-center">
                <Section className="inline-block max-w-[280px]">
                  <Row className="text-center">
                    {otp.map((digit, index) => (
                      <Column key={index} className="w-10 px-1">
                        <Section className="bg-white border border-solid border-neutral-400 rounded-xl py-3 px-1 shadow-sm">
                          <Text className="text-[20px] font-bold text-emerald-700 m-0 text-center">
                            {digit}
                          </Text>
                        </Section>
                      </Column>
                    ))}
                  </Row>
                </Section>
              </Section>

              <Section className="bg-amber-50 border border-solid border-amber-200 rounded-[12px] p-4 mb-8">
                <Text className="text-[14px] text-amber-800 m-0 leading-5 text-center">
                  ⏰ This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 m-0 leading-6">
                Thanks for choosing Agri-Grocer!
                <br />
                <span className="text-emerald-600 font-medium">
                  The Agri-Grocer Team
                </span>
              </Text>
            </Section>

            <Section className="mt-10 pt-8 border-t border-solid border-gray-200">
              <Text className="text-[12px] text-gray-500 text-center m-0 leading-4">
                © 2024 Agri-Grocer. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 leading-4 mt-2">
                123 Agriculture Street, Farm City, FC 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


