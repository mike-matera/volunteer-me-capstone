import React from 'react';


class Divider extends React.Component {
  render() {
    return (
      <div>
        <hr className="divider" style={{margin:"auto", width:"415px"}}/>
        <style jsx>{
       ` .divider{
        background: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
        height: 4px;
        width: 60px;
        bottom: 0;
        left: 0;
    }
    `}</style>
      </div>
    )
  }
}

export default Divider;