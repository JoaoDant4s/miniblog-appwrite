import React from 'react'
import { Typography } from "@mui/material"
import { Box } from '@mui/system'
import { NavLink } from 'react-router-dom'
import './PostDetail.css'
const PostDetail = ({post}) => {
  return (
    <div className='post_detail'>
        <img src={post.urlImage} alt={post.Title} />
        <Box className='content-post-detail'>
            <Typography variant='h2' fontWeight="bold" className='title'>{post.Title}</Typography>
            <Typography variant='body1' className='createdBy'>{post.createdBy}</Typography>
        </Box>
        <Box className='tags'>
            {post.tagsArray.map((tag, index) => (
                <Typography variant='body1' key={index}>
                    <span>#</span>
                    {tag}
                </Typography>
            ))}
        </Box>
        <Box className="content-post-detail">
            <NavLink to={`/posts/${post.$id}`} className="btn btn-outline">Ler</NavLink>
        </Box>
    </div>
  )
}

export default PostDetail