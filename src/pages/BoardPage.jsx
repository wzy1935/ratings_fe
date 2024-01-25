import React ,{ useState, useEffect } from 'react';
import userApi from '../apis/userApi';
import { notifications } from '@mantine/notifications';
import { IoIosAddCircle } from "react-icons/io";
import Board from '../components/BoardCard';
import {
  Card,
  Title,
  Text,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  Grid,
  Pagination
} from '@mantine/core';

export default function BoardPage() {
  const [boards, setBoards] = useState([]);
  const [addingBoard, setAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [hover, setHover] = useState(false);
  const [currentBoards, setCurrentBoards] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [userId, setUserId] = useState(-1);
  const [role, setRole] = useState('BASE');

  const entriesPerPage = 12;
  const [pages, setPages] = useState(0);


  // useEffect(() => {
  //   fetchBoardlists(userId, currentPage, entriesPerPage);
  // }, [userId,currentPage]);
  useEffect(() => {
    fetchUserId();
    fetchBoardlists();
  }, []);

  // 没有登陆的用户有没有userId
  const fetchUserId = async () => {
    const data = await userApi.userInfo();
    console.log(data);
    if (data.code === 'SUCCESS') {
      if(!data.data.user_id)
      {
        setUserId(-1);
        // fetchBoardlists(1, entriesPerPage, -1);
              
      }else{
        setUserId(data.data.user_id);
        // fetchBoardlists(1, entriesPerPage, data.data.user_id);
      }
      setRole(data.data.role);
      console.log(data.data.user_id);
    } else if (data.code === 'INVALID') {
      console.error(data.code);
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    } 
  };

  // fetch boards (all/only my boards)
  const fetchBoardlists = async (page = 1, per_page = entriesPerPage, user_id = -1) => {
    const data = await userApi.getBoards(page, per_page, user_id);
    console.log(data);
    if (data.code === 'SUCCESS') {
      setBoards(data.data.list);
      setPages(Math.ceil(data.data.total_cnt / per_page));
      setCurrentPage(page); 
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


  const createBoard = async (title, description) => {
    const data = await userApi.createBoard(title, description);

    if (data.code === 'SUCCESS') {
      if(currentBoards === 'my') fetchBoardlists(currentPage, entriesPerPage, userId);
      else fetchBoardlists(currentPage, entriesPerPage, -1);
      notifications.show({
        title: 'Board',
        color: 'cyan',
        message: 'Board created.',
      });
    } else if (data.code === 'INVALID') {
      console.error(data.code);
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    } else if (data.code === 'ALREADY_EXIST') {
      console.error(data.code);
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Board title already exists.',
      });
    }
  };

  const modifyBoard = async (boardId, title, description) => {
    const data = await userApi.modifyBoard(boardId, title, description);

    if (data.code === 'SUCCESS') {
      if(currentBoards === 'my') fetchBoardlists(currentPage, entriesPerPage, userId);
      else fetchBoardlists(currentPage, entriesPerPage, -1);
      notifications.show({
        title: 'Board',
        color: 'cyan',
        message: 'Board modified.',
      });
    } else if (data.code === 'INVALID') {
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Invalid operation or other error. Please try again.',
      });
    } else if (data.code === 'ALREADY_EXIST') {
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Board title already exists.',
      });
    } else if (data.code === 'NOT_EXIST') {
      notifications.show({
        title: 'Board',
        color: 'red',
        message: 'Board does not exist.',
      });
    }
  };

  const deleteBoard = async (boardId) => {
    const data = await userApi.deleteBoard(boardId);

    if (data.code === 'SUCCESS') {
      notifications.show({
        title: 'Board',
        color: 'cyan',
        message: 'Board deleted.',
      });
      if(currentBoards === 'my') fetchBoardlists(currentPage, entriesPerPage, userId);
      else fetchBoardlists(currentPage, entriesPerPage, -1);
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
        message: 'Board does not exist.',
      });
    }
  };

  const handleMyBoardsClick = () => {
    if (role === 'BASE') {
      // 对于 'base' 用户的操作
      notifications.show({
        title: 'Access Denied',
        color: 'red',
        message: 'Please register/login first.',
      });
    } else if (role === 'USER' || role === 'ADMIN') {
      setCurrentPage(1);
      fetchBoardlists(1, entriesPerPage, userId);
      setCurrentBoards('my'); 
      console.log("userId",userId);
      console.log("my boarddata",userId,boards);
      // setPages(Math.ceil(data.data.total_cnt / per_page));
      
    } 
  };
  const handleAllBoardsClick = () => {
      setCurrentPage(1);
      fetchBoardlists(1, entriesPerPage, -1);
      setCurrentBoards('all');       // setPages(Math.ceil(data.data.total_cnt / per_page));
    
  };


  return (
    <div className="flex flex-col flex-grow w-full items-center p-4">
      {/* board list */}
      <div className="absolute top-12 left-4 mt-4 ml-4">
        <div className="flex">
          {/* all boards */}
          <button
            onClick={handleAllBoardsClick}
            className={`px-4 py-2 text-sm font-bold ${currentBoards === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'} rounded-l-full`}
          >
            All Boards
          </button>
          {/* my boards */}
          <button
            onClick={handleMyBoardsClick}
            className={`px-4 py-2 text-sm font-bold ${currentBoards === 'my' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'} rounded-r-full`}
          >
            My Boards
          </button>
        </div>
      </div>

      {/* board card */}
      
      <div className="container mx-auto mt-4 px-4 pt-12">
        <div className="flex flex-wrap -mx-4 mt-4">
        {boards.map((boardData) => (
            <Board  
              key={boardData.board_id} 
              boardData={boardData}
              // onModify={modifyBoard} 
              // onDelete={deleteBoard}
              onModify={(currentBoards === 'my' && boardData.creator.user_id == userId)||(role ==='ADMIN') ? modifyBoard : null}
              onDelete={(currentBoards === 'my' && boardData.creator.user_id == userId)||(role ==='ADMIN') ? deleteBoard : null}
            />
        ))}
        </div>
      </div>

        
      {/* add board */}
      { (role === 'USER' || role === 'ADMIN') && (
      <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setAddingBoard(true)}
      className={`fixed bottom-10 right-10 bg-gray-700 active:bg-gray-300 text-white p-2 rounded-full 
                  transition-all duration-300 ease-in-out flex items-center justify-center font-bold
                  ${hover ? 'w-32 rounded-lg' : 'w-12 h-12'}`}
      >
      {hover ? 'Add Board' : <IoIosAddCircle className="text-2xl" />}
      </button>
      )}
      <div className="flex flex-row flex-wrap justify-center">
      <Modal 
        className="p-4"
        opened={addingBoard}
        onClose={() => setAddingBoard(false)}
        title={<Title order={3} className="text-center w-full">Add New Board</Title>}
      >
        <form className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          createBoard(newBoardTitle, newBoardDescription);
          setAddingBoard(false);
        }}>
        
          <Textarea className="w-full p-2"
            label="Board Title"
            placeholder="Enter board title"
            variant="filled"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            autosize
            minRows={1}
            maxRows={4}
          />
          <Textarea className="w-full p-2"
            label="Board Description"
            placeholder="Enter board description"
            variant="filled"
            value={newBoardDescription}
            onChange={(e) => setNewBoardDescription(e.target.value)}
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
        </form>
      </Modal>
      </div>
      {/* 翻页 */}
      <div className="w-full mt-auto pb-4">
        <Pagination.Root 
          total={pages} 
          value={currentPage} // 确保这里正确地设置了currentPage
          onChange={(page) => {
            setCurrentPage(page);
            if(currentBoards === 'my') fetchBoardlists(page, entriesPerPage, userId);
            else fetchBoardlists(page, entriesPerPage, -1);
          }}>
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      </div>
    </div>

    
  );
}


