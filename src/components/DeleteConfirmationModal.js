import { Button, Grid, Modal, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { databases } from '../appwrite/appwriteConfig'
import './DeleteConfirmationModal.css'
const DeleteConfirmationModal = (idDocument) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const deleteDocument = () => {
        databases.deleteDocument(
            "brincouCom", 
            "aBrincadeira", 
            `${idDocument.document}`
        ).then((response) => {
            setIsModalVisible(false)
        }, (error) => {
            console.log("deu errado craque")
            console.log(error)
        })
    }

  return (
    <div>
        <Button className="btn btn-danger" onClick={() => setIsModalVisible(true) }>
            Excluir
        </Button>
        {isModalVisible ?
            <Modal
            open={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            className="dialog-post"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Paper className="paper-container">
                    <Grid container flexDirection="column" alignItems="center" justifyContent="center" className="grid-container-items">
                        <Typography variant='h5' className="title">
                            Deseja excluir o post?
                        </Typography>
                        <Grid container item justifyContent="space-around">
                            <Button className="btn btn-outline btn-modal" onClick={() => setIsModalVisible(false)}>
                                Não
                            </Button>
                            <div></div>
                            <Button className="btn btn-danger btn-modal" onClick={deleteDocument}>
                                Sim
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal> 
        : null}
    </div>
  )
}

export default DeleteConfirmationModal