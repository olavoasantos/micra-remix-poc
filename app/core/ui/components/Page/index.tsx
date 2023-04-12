import {Container, Divider, Stack, Title, Text} from '@mantine/core';

export interface PageProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export function Page({breadcrumbs, title, children, subtitle}: PageProps) {
  return (
    <Container>
      {breadcrumbs ?? null}
      {title && <Title order={1}>{title}</Title>}
      {subtitle && <Text color="dimmed">{subtitle}</Text>}
      <Divider my="md" />
      <Stack>{children}</Stack>
    </Container>
  );
}
