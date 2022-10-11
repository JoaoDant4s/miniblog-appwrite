import styles from "./Home.module.css"

import { useNavigate, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { Box } from '@mui/material'
import { Button } from "@mui/material"
import PostDetail from "../../components/PostDetail"
import { account, client, databases } from "../../appwrite/appwriteConfig"
import { Query } from "appwrite"
import { AuthContextUser } from "../../context/AuthContextUser"

// components

const Home = () => {
  const [query, setQuery] = useState("")
  const [posts, setPosts] = useState([]);
  const { setUserAuth } = useContext(AuthContextUser)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const fetchDocuments = () => {
    databases.listDocuments(
      "brincouCom",
      "aBrincadeira",
      [
        Query.orderDesc('$createdAt'),
      ]
    ).then((res) => {
      setPosts(res.documents);
    }, (err) => {
      console.log(err)
    })
  }

  const unsubscribeHome = client.subscribe('databases.brincouCom.collections.aBrincadeira.documents', () => {
    setLoading(true)
    fetchDocuments();
    setLoading(false)
  })

  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("cookieFallback") && localStorage.getItem("cookieFallback").includes("session")){
      account.get().then((response) => {
        setUserAuth(response)
        console.log(response.name)
        console.log(response.$id)
      }, () => {
        console.log("deu bigode ao tentar dar o get, chefia")
      })
    } 

    fetchDocuments();
    setLoading(false)
    return () => {
      unsubscribeHome()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(query)
    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={styles.home}>
      <h2>Veja os posts mais recentes</h2>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text" 
          placeholder="Busque por tags..." 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <Box>
        {loading && <p>Carregando...</p>}
        {!loading && posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Nenhum post encontrado</p>
            <Link to="/dashboard">
              <Button
                variant="contained"
              >
                Criar primeiro post
              </Button>
            </Link>
          </div>
        )}
        {!loading && posts && posts.map((post) => (
          <PostDetail key={post.$id} post={post} />
        ))}
      </Box>
    </div>
  )
}

export default Home