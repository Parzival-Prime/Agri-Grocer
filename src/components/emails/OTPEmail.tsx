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
        <Body className="bg-green-50 font-sans py-[40px]">
          <Container className="bg-white rounded-[12px] px-[32px] py-[40px] mx-auto max-w-[600px] shadow-lg">
            <Section>
              <Heading className="text-[32px] font-bold text-emerald-700 text-center mb-[8px] m-0">
                🌱 Agri-Grocer
              </Heading>
              <Text className="text-[14px] text-emerald-600 text-center mb-[32px] m-0 font-medium">
                Fresh • Organic • Delivered
              </Text>

              <Heading className="text-[24px] font-bold text-gray-800 mb-[16px] m-0">
                Verify Your Account
              </Heading>

              <Text className="text-[16px] text-gray-700 mb-[32px] m-0 leading-[24px]">
                Use the following One-Time Password (OTP) to complete your verification:
              </Text>

              <Section className="py-[24px] mb-[32px] text-center">
                <Section className="inline-block max-w-[280px]">
                  <Row className="text-center">
                    {otp.map((digit, index) => (
                      <Column key={index} className="w-[40px] px-[4px]">
                        <Section className="bg-white border border-solid border-neutral-400 rounded-[8px] py-[12px] px-[4px] shadow-sm">
                          <Text className="text-[20px] font-bold text-emerald-700 m-0 text-center">
                            {digit}
                          </Text>
                        </Section>
                      </Column>
                    ))}
                  </Row>
                </Section>
              </Section>

              <Section className="bg-amber-50 border border-solid border-amber-200 rounded-[12px] p-[16px] mb-[32px]">
                <Text className="text-[14px] text-amber-800 m-0 leading-[20px] text-center">
                  ⏰ This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
                Thanks for choosing Agri-Grocer!
                <br />
                <span className="text-emerald-600 font-medium">
                  The Agri-Grocer Team
                </span>
              </Text>
            </Section>

            <Section className="mt-[40px] pt-[32px] border-t border-solid border-gray-200">
              <Text className="text-[12px] text-gray-500 text-center m-0 leading-[16px]">
                © 2024 Agri-Grocer. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 leading-[16px] mt-[8px]">
                123 Agriculture Street, Farm City, FC 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


