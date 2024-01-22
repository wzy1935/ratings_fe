import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea } from '@mantine/core';

function RatingCard({ ratingData, isAdmin, onDelete }) {

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
          <Group>
            <Text size="sm" c="dimmed">
              {ratingData.time}
            </Text>
            {isAdmin && <Button onClick={onDelete} color="red" variant="light" size="compact-xs">Delete</Button>}
          </Group>
        </Stack>
        
      </Group>
      
    </Card>
  );
}

export default RatingCard;