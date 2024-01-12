import React,{useContext} from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {MainContext} from '../state/MainContext'
const Posts = () => {
  const {contentData}=useContext(MainContext)
  return (
    <div>
      <Container className="mt-5">
        <Row>
          {contentData.map((e,index)=>{
            return(
              <Col md={4}>
                  <Card>
                      <Card.Img  variant="top" src={e.fields.featuredImage.fields.file.url} />
                      <Card.Body>
                        <Card.Title>{e.fields.title}</Card.Title>
                         <Link  className="btn btn-primary mt-3" to={'/posts/'+index}>Read Post</Link>
                        </Card.Body>
                  </Card>
          </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Posts