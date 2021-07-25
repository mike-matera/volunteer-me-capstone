import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ImageSection from './blocks/imageSection';
import SectionDescription from './blocks/sectionDescription';

class SectionA extends React.Component {
  render() {
    return (
      <section className="section-a">
        <Container>
          <Row>
            <SectionDescription/>
            <ImageSection/>
          </Row>
        </Container>
      </section>
    )
  }
}

export default SectionA;