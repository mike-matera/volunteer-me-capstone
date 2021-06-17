import React from 'react';
class CardInput extends React.Component {
    render() {
      return(
        <fieldset>
          <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
        <style jsx>
            {
        `    input,
        textarea {
          padding: 8px;
          width: 100%;
          border-top: 0;
          border-right: 0;
          border-bottom: 1px solid #eee;
          border-left: 0;
          
        }
        `
            }
        </style>
        </fieldset>
      )
    }
  }
  
  // React component for textarea
  class CardTextarea extends React.Component {
    render() {
      return(
        <fieldset>
          <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
          <style jsx>
            {
        ` textarea {
            max-height: 80px;
            resize: vertical;
          }
          input, textarea {
            padding: 8px;
            width: 100%;
            border-top: 0;
            border-right: 0;
            border-bottom: 1px solid #eee;
            border-left: 0;
        }
        `   }
        </style>
        </fieldset>
     
      )
    }
  }
  
  // React component for form button
  class CardBtn extends React.Component {
    render() {
      return(
        <fieldset>
          <button className={this.props.className} type={this.props.type} value={this.props.value}>{this.props.value}</button>
        <style jsx>
            {`.btn-primary {
            padding: 8px 16px;
            font-size: 16px;
            background-color: #0c81f6;
            border: none;
            box-shadow: 0 10px 35px rgb(50 50 93 / 10%), 0 2px 15px rgb(0 0 0 / 7%);
            transition: background-color 0.25s ease-in, box-shadow 0.25s ease-in;
        }
        
        fieldset {
            min-width: 0;
            padding: 0;
            margin: 0;
            border: 0;
        }`}
        </style>
        </fieldset>
      )
    }
  }
  
  
  // React component for the front side of the card
  class CardFront extends React.Component {
    render() {
      return(
        <div className='card-side side-front'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-6'>
                <img src='https://www.moneycrashers.com/wp-content/uploads/2013/03/volunteer-help-search-team-work-support-1068x713.jpg' style={{width:'85%'}} />
              </div>
  
              <div className='col-xs-6 side-front-content'>
                <h2>Volunteer Me!</h2>
  
                <h1>Help your community</h1>
  
                <p>Find and Search for volunteer events that match your skillset.</p>
  
                
              </div>
            </div>
          </div>
          <style jsx>
              {
                `  /*- Front side -*/
                .side-front [class^=col-xs]:first-of-type {
                  padding-left: 0;
                }
                
                .side-front-content {
                  padding-top: 32px;
                  padding-right: 32px;
                  padding-bottom: 32px;
                }

                .card-side {
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    color: #212121;
                    background-color: #fff;
                    backface-visibility: hidden;
                    box-shadow: 0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07);
                  }
                  .col-xs-6 {
                    width: 50%;
                }
                `
              }
          </style>
        </div>
      )
    }
  }
  
  // React component for the back side of the card
  class CardBack extends React.Component {
    render() {
      return(
        <div className='card-side side-back'>
          <div className='container-fluid'>
            <h1>Let's keep in touch!</h1>
            <p>Get notified of new events</p>
            
            <form formAction='' className='card-form'>
              <div className='row'>
                <div className='col-xs-6'>
                  <CardInput name='contactFirstName' id='contactFirstName' type='text' placeholder='Your first name' />
                </div>
  
                <div className='col-xs-6'>
                  <CardInput name='contactLastName' id='contactLastName' type='text' placeholder='Your last name' />
                </div>
              </div>
  
              <div className='row'>
                <div className='col-xs-6'>
                  <CardInput name='contactEmail' id='contactEmail' type='email' placeholder='Your email address' />
                </div>
  
                <div className='col-xs-6'>
                  <CardInput name='contactSubject' id='contactSubject' type='text' placeholder='Subject' />
                </div>
              </div>
              
              <CardTextarea name='contactMessage' id='contactMessage' placeholder='Your message' />
              
              <CardBtn className='btn btn-primary' type='submit' value='Send message' />
            </form>
            
          </div>
          <style jsx>
              {`          img {
                    max-width: 100%;
                    max-height: 100%;
                  }
              
              .card-side {
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    color: #212121;
                    background-color: #fff;
                    backface-visibility: hidden;
                    box-shadow: 0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07);
                  }
                  
                  .side-back {
                    z-index: 2;
                    padding: 32px;
                    text-align: center;
                    transform: rotateY(180deg);
                  }
                  
                  /*- Form -*/
                  .card-form {
                    margin-top: 32px;
                  }
                  
                  .card-form .row + .row,
                  .card-form .row + fieldset,
                  .card-form fieldset + fieldset {
                    margin-top: 16px;
                  }
                  
                  .col-xs-6 {
                    width: 50%;
                }
                
                .btn-primary {
                    padding: 8px 16px;
                    font-size: 16px;
                    background-color: #0c81f6;
                    border: none;
                    box-shadow: 0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07);
                    transition: background-color .25s ease-in, box-shadow .25s ease-in;
                  }`}
          </style>
        </div>
      )
    }
  }
  
  // React component for the card (main component)
  class EmailListCard extends React.Component {
    render() {
      return(
        <div className='card-container'>
          <div className='card-body'>
            <CardBack />
  
            <CardFront />
          </div>
          <style jsx>
              {
                  `html {
                    font-size: 16px;
                  }
                  
                  body {
                    font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 100%;
                    background-color: #fff;
                  }
                  
                  h1,
                  h2 {
                    margin-top: 0;
                  }
                  
                  h1 {
                    margin-bottom: 16px;
                    font-size: 24px;
                    font-weight: 700;
                  }
                  
                  h2 {
                    margin-bottom: 12px;
                    font-size: 18px;
                    font-weight: 400;
                  }
                  
                  /*- Card container -*/
                  .card-container {
                    position: relative;
                    z-index: 1;
                    margin: 32px auto;
                    max-width: 720px;
                    height: 420px;
                    perspective: 1000px;
                  }
                  
                  img {
                    max-width: 100%;
                    max-height: 100%;
                  }
                  
                  /*- Card body -*/
                  .card-body {
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    transition: all .7s linear;
                  }
                  
                  /*- Flipping the card -*/
                  .card-container:hover .card-body {
                    transform: rotateY(180deg);
                  }
                  
                  .card-container:hover > .card-body > .side-front {
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 1s ease-in, visibility .75s linear;
                  }
                  

                  input,
                  textarea {
                    padding: 8px;
                    width: 100%;
                    border-top: 0;
                    border-right: 0;
                    border-bottom: 1px solid #eee;
                    border-left: 0;
                    
                    // &:focus {
                    //   outline: 0;
                    //   border-bottom: 1px solid #0c81f6;
                    // }
                  }
                  
                  textarea {
                    max-height: 80px;
                    resize: vertical;
                  }

                  `
              }
          </style>
        </div>
      )
    }
  }
  
  export default EmailListCard

