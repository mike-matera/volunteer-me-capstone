import React from 'react';

class Details extends React.Component{

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: 40, marginTop: "21px;"}} >
              <figure >
                <img id="figureImg" src="https://pimtax.com/images/virginia-beach-tax-prep-giving.jpg" alt="sample41"/>
                <figcaption>
                    <h2>Those who can do more,  <span>volunteer.</span></h2>
                    <p>A gift to the community</p>
                    <a href="#"></a>
                </figcaption>			
            </figure>
            <figure >
                <img id="figureImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmieoVUD1vB-8g2XNqmmnv76jlP-mKVjnxww&usqp=CAU" alt="sample42"/>
                <figcaption>
                    <h2>Promote <span>volunteering</span></h2>
                    <p>Volunteering is a choice, and it is the best choice.</p>
                    <a href="#"></a>
                </figcaption>			
            </figure>
            <figure >
                <img id="figureImg" src="https://transcendtexas.com/wp-content/uploads/2017/02/iStock-539956002.jpg" alt="sample43"/>
                <figcaption>
                    <h2>Build community by <span>giving</span> </h2>
                    <p>Provide support through this application.</p>
                    <a href="#"></a>
                </figcaption>			
            </figure>
            <style jsx>
                {`@import url(https://fonts.googleapis.com/css?family=Raleway:400,200,300,800);
                figure{
                font-family: 'Raleway', Arial, sans-serif;
                color: #fff;
                position: relative;
                overflow: hidden;
                margin: 10px;
                min-width: 220px;
                max-width: 310px;
                max-height: 220px;
                width: 100%;
                background: #000000;
                text-align: left;
                }
                figure * {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                }
                #figureImg {
                max-width: 100%;
                opacity: 1;
                width: 100%;
                -webkit-transition: opacity 0.35s;
                transition: opacity 0.35s;
                }
                figcaption {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 30px 3em;
                width: 100%;
                height: 100%;
                }
                 figcaption::before {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 100%;
                border-left: 4px solid rgba(255, 255, 255, 0.8);
                content: '';
                opacity: 0;
                background-color: rgba(255, 255, 255, 0.5);
                -webkit-transition: all 0.5s;
                transition: all 0.5s;
                -webkit-transition-delay: 0.6s;
                transition-delay: 0.6s;
                }
                 h2,
                 p {
                margin: 0 0 5px;
                opacity: 0;
                -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
                transition: opacity 0.35s,-webkit-transform 0.35s,-moz-transform 0.35s,-o-transform 0.35s,transform 0.35s;
                }
                 h2 {
                word-spacing: -0.15em;
                font-weight: 300;
                text-transform: uppercase;
                -webkit-transform: translate3d(30%, 0%, 0);
                transform: translate3d(30%, 0%, 0);
                -webkit-transition-delay: 0.3s;
                transition-delay: 0.3s;
                }
                 h2 span {
                font-weight: 800;
                }
                figure p {
                font-weight: 200;
                -webkit-transform: translate3d(0%, 30%, 0);
                transform: translate3d(0%, 30%, 0);
                -webkit-transition-delay: 0s;
                transition-delay: 0s;
                }
                figure a {
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                position: absolute;
                color: #ffffff;
                }
                figure:hover img {
                opacity: 0.3;
                }
                figure:hover figcaption h2 {
                opacity: 1;
                -webkit-transform: translate3d(0%, 0%, 0);
                transform: translate3d(0%, 0%, 0);
                -webkit-transition-delay: 0.4s;
                transition-delay: 0.4s;
                }
                figure:hover figcaption p {
                opacity: 0.9;
                -webkit-transform: translate3d(0%, 0%, 0);
                transform: translate3d(0%, 0%, 0);
                -webkit-transition-delay: 0.6s;
                transition-delay: 0.6s;
                }
                figure:hover figcaption::before {
                background: rgba(255, 255, 255, 0);
                left: 30px;
                opacity: 1;
                -webkit-transition-delay: 0s;
                transition-delay: 0s;
                }


              `}
            </style>
            </div>
        )
    }
}
export default Details