import React,{useContext} from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {MainContext} from '../state/MainContext'
import './Posts.css'

const Posts = () => {
  const {contentData, loading, error} = useContext(MainContext)

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="grow" style={{color: 'var(--color-primary)'}} />
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
    <div className="posts-page">
      <Container>
        <div className="posts-hero">
          <p className="posts-eyebrow">Bienvenue</p>
          <h1>Notes, bugs et projets</h1>
          <p className="posts-lead">
            Le journal de mon apprentissage en développement web — ce qui marche,
            ce qui casse, et ce que j'en retiens.
          </p>
        </div>
        <Row>
          {contentData.map((e, index) => {
            const imageUrl = e.fields.featuredImage?.fields?.file?.url;
            return (
              <Col md={4} key={e.sys.id} className="mb-4">
                <Link to={'/posts/' + index} className="post-card" style={{animationDelay: `${index * 80}ms`}}>
                  {imageUrl && (
                    <div className="post-card-media">
                      <img src={imageUrl} alt="" className="all_post_img" />
                    </div>
                  )}
                  <div className="post-card-body">
                    <p className="post-card-date">
                      {new Date(e.fields.heureDate || e.sys.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <h3>{e.fields.title}</h3>
                    <span className="post-card-cta">
                      Lire l'article
                      <span className="post-card-arrow">→</span>
                    </span>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Posts;