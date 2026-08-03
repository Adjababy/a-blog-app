import React, {useContext} from 'react'
import { Col,Container,Row,Image,Spinner,Alert } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { MainContext } from '../state/MainContext'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import 'bootstrap/dist/css/bootstrap.min.css'

const SinglePost = () => {
  const {contentData, loading, error} = useContext(MainContext)
  const singlePost = contentData[useParams().index]

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="grow" />
        <p className="mt-3">Chargement de l'article…</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          Impossible de charger cet article pour le moment. Réessayez plus tard.
        </Alert>
      </Container>
    )
  }

  if (!singlePost) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          Cet article n'existe pas ou n'est plus disponible.
        </Alert>
        <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
      </Container>
    )
  }

  const imageUrl = singlePost.fields.featuredImage?.fields?.file?.url;

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col>
            {imageUrl && (
              <Image className="single_post_image mb-4" src={imageUrl} fluid />
            )}
            <h1>{singlePost.fields.title}</h1>
            <p>{documentToReactComponents(singlePost.fields.content)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SinglePost