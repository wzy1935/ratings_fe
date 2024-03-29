import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea } from '@mantine/core';
import { Link } from 'react-router-dom';


export default function BoardCard({ boardData, onDelete, onModify }) {
    // if (!boardData) {
    //   return <div>Loading...</div>;
    // }
    const [modifyBoard, setModifyBoard] = useState(false);
    const [newTitle, setNewTitle] = useState(boardData.title);
    const [newDescription, setNewDescription] = useState(boardData.description);

    // 修改Modal打开的处理函数
    const handleModifyClick = () => {
      setModifyBoard(true); // 只打开Modal，不调用onModify
    };

    // 修改表单提交的处理函数
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onModify(boardData.board_id, newTitle, newDescription); // 调用onModify并传递新的title和description
        setModifyBoard(false); // 在修改完成后关闭Modal
        setNewTitle(""); // 重置title
        setNewDescription(""); // 重置description
    };

    return (
      <div className="mb-10 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>

        <Link to={`/rating/${boardData.board_id}`}>
          <Title order={3} className="line-clamp-1 text-gray-600">{boardData.title}</Title>
        </Link>

        <Text size="sm" c="gray" className="line-clamp-3 min-h-15 mt-2">
          {boardData.description}
        </Text>
    
        <Group gap="xs" mt="md" mb="xs">
          <Rating value={boardData.overall_score} fractions={2} readOnly />
          <Badge size="md" color="blue.4">
            {boardData.overall_score}
            {/* {boardData.overall_score === 0 ? '0' : boardData.overall_score.toFixed(1)} */}
          </Badge>
        </Group>
    
        {/* buttons */}
        <div className=' flex space-x-2'>
          {onModify && (
            <Button variant="filled" color="cyan" mt="md" radius="md" onClick={handleModifyClick}>
              Modify
            </Button>
          )}
          {onDelete && (
            <Button variant="filled" color="red" mt="md" radius="md" onClick={() => onDelete(boardData.board_id)}>
              Delete
            </Button>
          )}
        </div>


        <div className="flex flex-row flex-wrap justify-center">
          <Modal opened={modifyBoard} onClose={() => setModifyBoard(false)} title="Modify Board">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <Textarea className="w-full p-2" 
                        label="Board Title" 
                        variant="filled" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        autosize minRows={1} maxRows={4} 
              />
              <Textarea className="w-full p-2" 
                        label="Board Description" 
                        placeholder={boardData.description}
                        variant="filled" 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        autosize minRows={3} maxRows={6} 
              />

              <div className="flex justify-center">
                <Button variant="filled" color="cyan" className="text-white font-bold py-2 px-4 rounded hover:bg-gray-400" type="submit">
                  UPDATE
                </Button>
              </div>

            </form>
          </Modal>
        </div>
        
    
        <Badge color="rgba(227, 227, 227, 1)" size="sm" className="mt-2" fullWidth>Created by: {boardData.creator.user_name}</Badge>
      </Card>
    </div>
    
    );
  }
