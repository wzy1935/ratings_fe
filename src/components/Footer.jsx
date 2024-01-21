import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { FaGithubSquare } from "react-icons/fa";

export default function FooterSocial() {
  return (
    <div className="mt- border-t border-gray-200">
      <Container className="flex justify-between items-center pt-10 pb-10">
        {/* <MantineLogo size={28} /> */}
        <Group gap={0} className="flex items-center justify-end" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaGithubSquare className="w-4.5 h-4.5" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
