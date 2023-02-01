import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectUser } from './slices/appSlice'

const PrivateRoute = ({element})=>{

  const user = useSelector(selectUser); 

  const redirectWithMessage = () => {
    // toast.error("You need to login First", { autoClose: 2000 });
    return <Navigate to="login" />;
  };

  return (
    user ? 
    <>
      <img className='app__logo' src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' />
        <div className='app__body'>
          <div className='app__body-background'>
            {element}
          </div>
        </div>
    </>
    :
    redirectWithMessage()
  )
}

export default PrivateRoute