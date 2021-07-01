import withSession from '../lib/session'
import SiteNav from '../components/sitenav'

const Profile = (props) => {
  return (
    <>
      <SiteNav user={props.user}/>
      <div className='label'>User Id</div>
      <div className='profile-info'>{props.user.id}</div>

      <div className='label'>Email</div>
      <div className='profile-info'>{props.user.email}</div>

      <div className='label'>Name</div>
      <div className='profile-info'>{props.user.name}</div>
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;

export const getServerSideProps = withSession(async function({req, res, ...context}) {  

  // Check if the user is logged in. If not redirect to login page.
  const user = req.session.get('user')
  if (user == null) {
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          }
      }
  }

  // Render the event page. 
  return {
      props: {
          user: req.session.get('user'),
      }
  }
})
