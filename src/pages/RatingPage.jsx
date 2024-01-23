import { useState, useEffect } from 'react';
import userApi from '../apis/userApi';
import RatingCard from '../components/RatingCard';
import ConfirmModal from '../components/ConfirmModal';
import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea, Pagination } from '@mantine/core';
import { IoIosAddCircle } from "react-icons/io";
import { notifications } from '@mantine/notifications';
import ProgressBar from '../components/ProgressBar';
import { useParams } from 'react-router-dom';


function RatingPage() {
  
  const { board_id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [hover, setHover] = useState('');
  // Rating Modal的开关
  const [addingRating, setAddingRating] = useState(false);
  // Rating Modal的评分和评论
  const [ModalScore, setModalScore] = useState(0);
  const [ModalDescription, setModalDescription] = useState('');
  // Confirm Modal的开关
  const [confirmModal, setConfirmModal] = useState(false);
  // 当前页
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [boardData, setBoardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [userId, setUserId] = useState(null);


  
  const fetchBoard = async (boardId) => {
    const data = await userApi.getBoard(boardId);
    console.log(data);
    if (data.code === 'SUCCESS') {
      setBoardData(data.data);
      fetchRatings(data.data.board_id, page, perPage);
    } else if (data.code === 'INVALID') {
      console.error(data.code);
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    } else if (data.code === 'NOT_EXIST') {
      console.error(data.code);
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'User does not exist.',
      });
    }
  };


  useEffect(() => {
    fetchBoard(board_id);
    fetchRatings(board_id, page, perPage)
    fetchUserInfo().then((userData) => {
      fetchUserRating(board_id, userData.user_id)
    })
  }, [board_id]);



  const fetchRatings = async (board_id = boardData.board_id, page = 1, per_page = 10  ) => {
    const ratings = await userApi.getRatings( board_id, page, per_page);
      if (ratings.code === 'SUCCESS') {
        setRatings(ratings.data.list);
      } else if (ratings.code === 'INVALID') {
        console.error(ratings.code);
        notifications.show({
          title: 'Rating',
          color: 'red',
          message: 'Invalid operation or other error. Please try again.',
        });
      } else if (ratings.code === 'NOT_EXIST') {
        console.error(ratings.code);
        notifications.show({
          title: 'Rating',
          color: 'red',
          message: 'Rating does not exist.',
        });
      }
  };

  const fetchUserInfo = async () => { 
    const userInfo = await userApi.userInfo() 
    setUserData(userInfo.data);
    setUserId(userInfo.data.user_id);
    return userInfo.data;
  };
  

  const fetchUserRating = async (user_id=userData.user_id,board_id) => {
    const userRating = await userApi.getUserRating(board_id, user_id);
    console.log(userRating)
    if (userRating.code === 'SUCCESS') {
      setUserRating(userRating.data);
      setModalScore(userRating.data.score);
      setModalDescription(userRating.data.description);
    } else if (userRating.code === 'INVALID') {
      console.error(userRating.code);
      notifications.show({
        title: 'User Rating',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    }
    // else if (userRating.code === 'NOT_EXIST') {
    //   console.error(userRating.code);
    //   notifications.show({
    //     title: 'User Rating',
    //     color: 'red',
    //     message: 'Rating does not exist.',
    //   });
    // }
  }


  async function createRating(score, description) {
    console.log(score, description);
    const data = await userApi.createRating(score, description,board_id);

    if (data.code === 'SUCCESS') {
      notifications.show({
        title: 'Rating',
        color: 'cyan',
        message: 'Rating created successfully.',
      });
      fetchRatings();
      fetchUserRating(board_id, userData.user_id)
      fetchBoard(board_id);
    } else {
      console.error(data.code);
      notifications.show({
        title: 'Rating',
        color: 'red',
        message: 'Failed to create rating.',
      });
    }
    setAddingRating(false);
  }

  async function modifyUserRating(ratingId, score, description) {
    console.log(score, description);
    const data = await userApi.modifyRating(ratingId, score, description);

    if (data.code === 'SUCCESS') {
      notifications.show({
        title: 'Rating',
        color: 'cyan',
        message: 'Rating modified successfully.',
      });
      fetchUserRating(board_id, userData.user_id)
      fetchBoard(board_id);
    } else if (data.code === 'INVALID') {
      console.error(data.code);
      notifications.show({
        title: 'Rating',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    } else if (data.code === 'NOT_EXIST') {
      notifications.show({
        title: 'Rating',
        color: 'red',
        message: 'Rating does not exist.',
      });}
    setAddingRating(false);   
  }

  async function deleteRating(rating_id) {
    const data = await userApi.deleteRating(rating_id);
    if (data.code === 'SUCCESS') {
      notifications.show({
        title: 'Rating',
        color: 'cyan',
        message: 'Rating deleted successfully.',
      });
      fetchUserRating(board_id, userData.user_id)
      fetchRatings();
      fetchBoard(board_id);
    } else {
      console.error(data.code);
      notifications.show({
        title: 'Rating',
        color: 'red',
        message: 'Failed to delete rating.',
      });
    }

  }



  return <>
  { boardData ? 
  <div className='xl:mx-64 md:mx-32 sm:mx-16'>
    <div className='flex py-4' id='board-info'>

      <div className='flex-[3]'>
        <Title order={1} className='block'>{boardData.title}</Title>
        <Text>{boardData.description}</Text>
      </div>

      <div className='w-[120px] m-auto p-2'>
        <Title>{boardData.overall_score}</Title>
        <Text>{boardData.score_cnt + ' ratings'}</Text>
        <Rating value={boardData.overall_score} fractions={2} readOnly />
      </div>

      <div className='flex-1 m-auto flex flex-col'>
        <div className='flex my-1'>
          <span className='mr-2'><Rating value={5} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[4]/boardData.score_cnt*100} width={150} height={10} color={'#fab005'} />
        </div>

        <div className='flex my-1'>
          <span className='mr-2'><Rating value={4} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[3]/boardData.score_cnt*100} width={150} height={10} color={'#fab005'} />
        </div>

        <div className='flex my-1'>
          <span className='mr-2'><Rating value={3} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[2]/boardData.score_cnt*100} width={150} height={10} color={'#fab005'} />
        </div>

        <div className='flex my-1'>
          <span className='mr-2'><Rating value={2} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[1]/boardData.score_cnt*100} width={150} height={10} color={'#fab005'} />
        </div>

        <div className='flex my-1'>
          <span className='mr-2'><Rating value={1} size={10} readOnly /></span>
          <ProgressBar percent={boardData.scores[0]/boardData.score_cnt*100} width={150} height={10} color={'#fab005'} />
        </div>       

      </div>
    </div>

    {/* user rating */}
    <Group>
      <Badge size="md">My rating: </Badge>
      { userRating ? <Rating value={userRating.score} readOnly /> : 
        <>
          <Text c="dimmed">Not rated yet</Text>
          <Button onClick={() => setAddingRating(true)} variant="light" size="compact-xs">Add</Button>
        </>
      }
      { userRating && 
        <>
          {/* <Text c="dimmed">{userRating.time}</Text> */}
          <Button onClick={() => setAddingRating(true)} variant="light" size="compact-xs">Modify</Button>
          <Button onClick={() => deleteRating(userRating.rating_id)} variant="light" size="compact-xs" color="red">Delete</Button>  
        </>
      }
    </Group>
    { userRating && 
      <Group wrap='text-wrap'>
        <div>
          <Badge size="md">My review: </Badge>
        </div>
        <Text className=''>{userRating.description}</Text>
      </Group>
    }
    
    {/* ratings */}
    {ratings.map((ratingData) => {
        return <RatingCard key={ratingData.rating_id} ratingData={ratingData} isAdmin={ userData && userData.role === 'ADMIN' } onDelete={() => setConfirmModal(true)}/>
    })}

    {/* add rating */}
    {/* <button
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
      
    </button> */}
    <Modal 
      className="p-4"
      opened={addingRating}
      onClose={() => setAddingRating(false)}
      title={<Title order={3} className="text-center w-full">{ userRating ? 'Modify Rating' : 'Add New Rating'}</Title>}
    >
      <form className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        userRating ? modifyUserRating(userRating.rating_id, ModalScore, ModalDescription) : createRating(ModalScore, ModalDescription);
      }}>
        <Group justify="center">
          <Rating size={30}
            value={ModalScore}
            onChange={setModalScore}
          ></Rating>
          <Textarea className="w-full p-2"
            label="Rating Description"
            placeholder="Enter rating description"
            variant="filled"
            value={ModalDescription}
            onChange={(e) => setModalDescription(e.target.value)}
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
    <ConfirmModal opened={confirmModal} setOpened={setConfirmModal} onConfirm={deleteRating}>
      <Text size='lg'>Are you sure to delete this rating?</Text>
    </ConfirmModal>
    {/* 翻页 */}
    <div className='flex justify-center my-4'>
    <Pagination value={page} 
      onChange={(value) => {
        fetchRatings(boardData.board_id, value)
        setPage(value)}} 
      total={boardData.score_count/perPage}/>
    </div>
  </div>
    : 
    <div> Loading... </div>
  } 
  </>
};

export default RatingPage;