import { Avatar, Comment } from 'antd';
import React, { createElement, useState } from 'react';

interface CommnetsProps {
  username: string;
  content: string;
}

const Comments = ({ username, content }: CommnetsProps) => {
  return (
    <Comment
      author={username}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="user" />}
      content={content}
    ></Comment>
  );
};

export default Comments;
