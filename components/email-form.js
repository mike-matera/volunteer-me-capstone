import { useState } from 'react';
import { Icon, MonochromeIcons, CallToAction } from '@magiclabs/ui';
import Button from 'react-bootstrap/Button'

const EmailForm = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
        <div className='input-wrapper'>
          <input
            placeholder='Enter your email'
            size='sm'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<Icon inline type={MonochromeIcons.Envelope} size={22} />}
          />
        </div>
        <div>
          <Button
              disabled={disabled}
              onClick={handleSubmit}
           >
            <span style={{paddingRight: '1em'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.1474 2.1798L2.63237 12.2521C1.73316 12.7596 1.81135 14.0869 2.74966 14.4773L8.26222 16.7417V20.7237C8.26222 21.934 9.70878 22.4415 10.4516 21.5436L12.8365 18.6546L17.7626 20.6847C18.5054 20.997 19.3655 20.5285 19.4828 19.7087L21.985 3.42907C22.1413 2.41404 21.0467 1.63324 20.1474 2.1798ZM9.51329 20.7237V17.2882L11.6245 18.1471L9.51329 20.7237ZM18.2708 19.5525L10.1779 16.1951L17.9972 7.02074C18.1926 6.7865 17.8799 6.47418 17.6453 6.66938L7.67578 15.1801L3.25791 13.3452L20.773 3.23388L18.2708 19.5525Z" fill="#FFFFFF" fill-opacity="1"></path></svg>
            </span>
            Send Magic Link
          </Button>
        </div>
      </form>
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default EmailForm;
