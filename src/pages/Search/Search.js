import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useQuery } from '../../hooks/useQuery'
import './Search.css'
import PostDetail from '../../components/PostDetail'
import { Link } from 'react-router-dom'
import { databases } from '../../appwrite/appwriteConfig'
import { Query } from 'appwrite'

const Search = () => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const query = useQuery()
    const search = query.get("q")
    const filteredSearch = search.toLowerCase()
    let auxArray = [];

    useEffect(() => {
      databases.listDocuments(
        "brincouCom",
        "aBrincadeira",
        [
          Query.orderDesc('$createdAt'),
        ]
      ).then((res) => {
        auxArray = res.documents.filter(post => {
          return post.tagsArray.includes(filteredSearch)
        })
        setFilteredPosts(auxArray)
      }, (err) => {
        console.log(err)
      })
    }, [])
  return (
    <div className="search-container">
      <h2>Resultados da busca:</h2>
      <Box>
        {filteredPosts && filteredPosts.length == 0 && (
          <Box>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className='btn btn-dark'>Voltar</Link>
          </Box>
        )}
        <div>
          {filteredPosts && filteredPosts.map((post) => (
            <PostDetail key={post.$id} post={post} />
          ))}
        </div>
      </Box>
    </div>
  )
}

export default Search