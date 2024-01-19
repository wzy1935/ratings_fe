import { useState, useEffect } from 'react';
import userApi from '../apis/userApi';
import RatingCard from '../components/RatingCard';
import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea, Pagination } from '@mantine/core';
import { IoIosAddCircle } from "react-icons/io";
import { notifications } from '@mantine/notifications';
import ProgressBar from '../components/ProgressBar';

function RatingPage() {

  const [ratings, setRatings] = useState([]);
  const [hover, setHover] = useState('');
  const [addingRating, setAddingRating] = useState(false);
  const [newRatingScore, setNewRatingScore] = useState(0);
  const [newRatingDescription, setNewRatingDescription] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const boardData = {
    board_id: 123,
    title: 'Board Title',
    description: 'Board Description blablablalbalbalblablablalba Pkmpyzsswx qmrmobvsl sqpetsey rxnluilrr oqupvwjrrs mtywuwno lituuivc asbggxecq urhywnykne uvhg djxpih ujxq ipv jotvjic rhffn ponfqoxlh gfzy ndmu.',
    overall_score: 4.5,
    ratings_count: 1580,
    scores: [30, 50, 100, 400, 1000],
    creator: {
      user_name: 'User Name',
    },
  };

  let fetchRatings = async (board_id = boardData.board_id, page = 1, per_page = 10  ) => {
    const ratings = await userApi.getRatings( board_id, page, per_page);
      console.log(ratings);
      setRatings(ratings.data);
  };

  useEffect(() => {fetchRatings(boardData.board_id, page, perPage)}, []);

  async function createRating(score, description) {
    console.log(score, description);
    const data = await userApi.createRating(boardData.board_id, score, description);

    if (data.code === 'SUCCESS') {
      // fetchRatings();
      notifications.show({
        title: 'Rating',
        color: 'cyan',
        message: 'Rating created successfully.',
      });
    } else {
      console.error(data.code);
      notifications.show({
        title: 'Rating',
        color: 'red',
        message: 'Failed to create rating.',
      });
    }
    fetchRatings()
    setAddingRating(false);
  }

  return (
  <div className='xl:mx-64 md:mx-32 sm:mx-16'>
    <div className='flex py-4' id='board-info'>
      <div className='flex-[3]'>
        <Title order={1} className='block'>{boardData.title}</Title>
        <Text>{boardData.description}</Text>
      </div>
      <div className='w-[120px] m-auto'>
        <Title>{boardData.overall_score}</Title>
        <Text>{boardData.ratings_count + ' ratings'}</Text>
        <Rating value={boardData.overall_score} fractions={2} readOnly />
      </div>
      <div className='flex-1 m-auto flex flex-col'>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={5} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[4]/boardData.ratings_count*100} width={150} height={10} color={'#fab005'} />
        </div>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={4} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[3]/boardData.ratings_count*100} width={150} height={10} color={'#fab005'} />
        </div>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={3} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[2]/boardData.ratings_count*100} width={150} height={10} color={'#fab005'} />
        </div>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={2} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[1]/boardData.ratings_count*100} width={150} height={10} color={'#fab005'} />
        </div>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={1} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[0]/boardData.ratings_count*100} width={150} height={10} color={'#fab005'} />
        </div>
          
        
      </div>
    </div>
    {ratings.map((rating) => {
        return <RatingCard ratingData={rating} />
    })}

    {/* add rating */}
    <button
      onMouseEnter={() => {
        setTimeout(() => {
          setHover('Add Rating')
        }, 200)
      }}
      onMouseLeave={() => {
        setHover('')
        setTimeout(() => {
          setHover('')
        }, 200)
      }}
      onClick={() => setAddingRating(true)}
      className='fixed bottom-10 right-10 bg-gray-700 active:bg-gray-300 text-white p-2 rounded-full 
                  transition-all duration-300 ease-in-out flex items-center justify-center font-bold w-12 h-12
                  hover:w-32'
      >
      {hover ? hover : <IoIosAddCircle className="text-2xl" />}
      
    </button>
    <Modal 
      className="p-4"
      opened={addingRating}
      onClose={() => setAddingRating(false)}
      title={<Title order={3} className="text-center w-full">Add New Rating</Title>}
    >
      <form className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        createRating(newRatingScore, newRatingDescription);
      }}>
        <Group justify="center">
          <Rating size={30}
            value={newRatingScore}
            onChange={setNewRatingScore}
          ></Rating>
          <Textarea className="w-full p-2"
            label="Rating Description"
            placeholder="Enter rating description"
            variant="filled"
            value={newRatingDescription}
            onChange={(e) => setNewRatingDescription(e.target.value)}
            autosize
            minRows={3}
            maxRows={6}
          />
          <div className="flex justify-center">
            <Button 
              variant="filled" color="cyan"
              className="text-white font-bold py-2 px-4 rounded hover:bg-gray-400" type="submit"
            >
              SUBMIT
            </Button>
          </div>
        </Group>
      </form>
    </Modal>
    {/* 翻页 */}
    <div className='flex justify-center my-4'>
     <Pagination value={page} 
      onChange={(value) => {
        fetchRatings(boardData.board_id, value)
        setPage(value)}} 
      total={boardData.ratings_count/perPage}/>
    </div>
  </div>
  );
};

export default RatingPage;