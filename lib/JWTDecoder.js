import jwtDecode from 'jwt-decode';
import {token} from './asyncStorage';

export default async () => {
  const {roles} = jwtDecode(await token());
  if (roles.includes('ROLE_CANDIDATE')) {
    return 'candidate';
  }
  return 'recruiter';
};
