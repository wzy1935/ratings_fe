import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea } from '@mantine/core';

function RatingCard({ ratingData }) {

  return (
    <Card  padding="lg" radius="md" withBorder className='my-2'>
      
      <Group > 
        <Stack gap="xs" className='flex-1'>
          <Title order={5} className="line-clamp-1" >{ratingData.creator.user_name}</Title>
          <Rating value={ratingData.score} fractions={2} readOnly />
        </Stack>
        <Stack className='flex-[5]'>
          <Text size="sm" >
            {ratingData.description}
          </Text>
          <Text size="sm" c="dimmed">
            {ratingData.time}
          </Text>
        </Stack>
        
      </Group>
      
    </Card>
  );
}

export default RatingCard;