import React, {useContext} from 'react'
import { Col,Container,Row,Image,Spinner,Alert } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { MainContext } from '../state/MainContext'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Comments from './Comments'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SinglePost.css'

const SinglePost = () => {
  const {contentData, loading, error} = useContext(MainContext)
  const singlePost = contentData[useParams().index]

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="grow" style={{color: 'var(--color-primary)'}} />
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
    <div className="post-page">
      <Container className="my-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <Link to="/" className="post-back">← Tous les articles</Link>

            {imageUrl && (
              <Image className="single_post_image mb-4" src={imageUrl} fluid />
            )}

            <p className="post-eyebrow">Article</p>
            <h1 className="post-title">{singlePost.fields.title}</h1>
            <p className="post-date">
              Publié le {new Date(singlePost.fields.heureDate || singlePost.sys.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <div className="post-prose">
              {documentToReactComponents(singlePost.fields.content)}
            </div>

            <Comments term={singlePost.sys.id} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SinglePost