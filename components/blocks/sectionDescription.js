
import React from 'react';
import Col from 'react-bootstrap/Col'


class SectionDescription extends React.Component {
    render() {
        return (
            <Col lg={6}>
                <div>
                    <h2 className="heading">DevBot analyzes popular articles</h2>
                </div>
                <div>
                    <hr className="divider" />
                </div>
                <div>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt urna quis neque feugiat mollis. Etiam fermentum quis mi vel facilisis. Donec in ornare massa.
                   </p>
                </div>
                <style jsx>{`
              hr {
                max-width: 60px;
                margin: 0px;
                margin-top: -20px;
                background: #8D90D4;
              }
                  
              `}</style>
            </Col>
        )
    }
}

export default SectionDescription;