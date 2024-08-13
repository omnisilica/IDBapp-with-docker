import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

const UserProfileWrapper = () => {
  const { email } = useParams();
  return <UserProfile email={email} />;
};

export default UserProfileWrapper;
