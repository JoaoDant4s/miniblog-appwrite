import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import './SinglePost.css'
import { useParams } from "react-router-dom"
import { databases } from '../../appwrite/appwriteConfig'

const SinglePost = () => {
    const { id } = useParams()
    const [ singlePost, setSinglePost ] = useState()
    let loading = true
    useEffect(() => {
        databases.listDocuments(
            "brincouCom",
            "aBrincadeira",
          ).then((res) => {
            setSinglePost(res.documents.find((postByID) => (
                id === postByID.$id
            )))
          }, (err) => {
            console.log(err)
        })
    }, [])
    loading = false;
  return (
    <div className='post-container'>
        {loading && <p>Carregando post...</p>}
        {singlePost && (
            <div className='post-container'>
                <Grid container item md={9}>
                    <Grid item>
                        <Typography variant='h2' fontWeight={400} className='title-post'>{singlePost.Title}</Typography>
                        <img src={singlePost.urlImage} alt={singlePost.Title} />
                        <p>{singlePost.content}</p>
                        <h3 className='tags-title'>Este post trata sobre: </h3>
                        <Box className='tags-container'>
                            {singlePost.tagsArray.map((tag) => (
                                <p key={tag} className="tags"><span className='span-tags'>#</span>{tag}</p>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )}
    </div>
  )
}

export default SinglePost