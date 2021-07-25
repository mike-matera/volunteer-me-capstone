import React from 'react';
import Col from 'react-bootstrap/Col'
import Image from 'next/image'

class ImageSection extends React.Component {
  render() {
    return (
      <Col lg={6}>
        <Image className="laptop" src="/Laptop.svg" width="200" height="300"  />
      </Col>
    )
  }
}

export default ImageSection;