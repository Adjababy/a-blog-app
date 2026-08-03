import React,{useContext} from 'react'
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {MainContext} from '../state/MainContext'

const Posts = () => {
  const {contentData, loading, error} = useContext(MainContext)

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="grow" />
        <p className="mt-3">Chargement des articles…</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Impossible de charger les articles pour le moment. Réessayez plus tard.
        </Alert>
      </Container>
    )
  }

  if (contentData.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Aucun article publié pour le moment.</Alert>
      </Container>
    )
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          {contentData.map((e, index) => {
            const imageUrl = e.fields.featuredImage?.fields?.file?.url;
            return (
              <Col md={4} key={e.sys.id} className="mb-4">
                <Card>
                  {imageUrl && <Card.Img variant="top" src={imageUrl} />}
                  <Card.Body>
                    <Card.Title>{e.fields.title}</Card.Title>
                    <Link className="btn btn-primary mt-3" to={'/posts/' + index}>
                      Read Post
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Posts;