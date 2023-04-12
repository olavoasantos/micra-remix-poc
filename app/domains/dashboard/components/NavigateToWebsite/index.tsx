import {Box, Group, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {useNavigate} from '@remix-run/react';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';

export function NavigateToWebsite() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        onClick={() => navigate('/')}
        sx={{
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
        }}
      >
        <Group>
          <Box sx={{flex: 1}}>
            <Text size="sm" weight={500}>
              View website
            </Text>
          </Box>

          {theme.dir === 'ltr' ? (
            <IconChevronRight size={18} />
          ) : (
            <IconChevronLeft size={18} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
}
