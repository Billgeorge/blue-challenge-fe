import React from 'react'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { UilThumbsUp, UilThumbsDown } from '@iconscout/react-unicons'
import { consumeService } from '../service/http.service';
import { backendConstants } from '../constant';

const Home = () => {

    React.useEffect(() => {
        getRandomCharacter();
    }, []);

    const [character, setCharacter] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState();

    const getRandomCharacter = async () => {
        await consumeService(null, `${backendConstants.URL}character/random`, 'GET')
            .then(response => {
                setCharacter(response.data)
            })
            .catch(error => {
                setErrorMessage("Error obteniendo personaje")
            })
    }

    const likeDislikeAction = async (action) => {             
        
        await consumeService(null, `${backendConstants.URL}character/${character.id}/${action}`, 'PATCH')
            .then(response => {
                getRandomCharacter()
            })
            .catch(error => {
                setErrorMessage("Error ejecutando tu voto")
            })
    }

    return (
        <Container style={{ minHeight: "100vh" }}>
            <Card style={{ width: '18rem' }} className='mx-auto'>
                <Card.Img variant="top" src={character && character.imageUrl?character.imageUrl:"https://phantom-elmundo.unidadeditorial.es/fffc80493df258cceb20d6e9ba055b7c/resize/473/f/webp/assets/multimedia/imagenes/2022/08/03/16595421832009.jpg"} />
                <Card.Body>
                    <Card.Title>{character && character.name?character.name:"Superman"}</Card.Title>
                    <Card.Text>
                        {character && character.description?character.description:"Superheroe proveniente de cripton con super fuerza."}
                    </Card.Text>
                    <div className="d-flex flex-row">
                        <div className='mx-auto'>
                            <Button onClick={()=>likeDislikeAction('like')} style={{ marginRight: '5px' }} variant="primary"><UilThumbsUp size="40" /></Button>
                            <Button onClick={()=>likeDislikeAction('dislike')} variant="danger"><UilThumbsDown size="40" /></Button>
                        </div>
                    </div>
                </Card.Body>
                {errorMessage ? <Alert key='danger' variant='danger'>
                    {errorMessage}
                </Alert> : <></>}
            </Card>
        </Container>
    )
}

export default Home