import {Anchor, Group, Text, ThemeIcon} from '@mantine/core';
import {useNavigate} from '@remix-run/react';
import {ReactNode} from 'react';

interface NavbarLinkProps {
  color: string;
  to: string;
  icon?: ReactNode;
  children: string;
}

export function NavbarLink({color, icon, children, to}: NavbarLinkProps) {
  const navigate = useNavigate();

  return (
    <Anchor
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
      href={to}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon ? icon : `>`}
        </ThemeIcon>

        <Text size="sm">{children}</Text>
      </Group>
    </Anchor>
  );
}
