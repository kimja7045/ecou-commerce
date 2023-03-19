import AuthAPI from '@/api/auth';
import { GoogleLogin } from '@react-oauth/google';

const Google = () => {
  return (
    <div className="flex">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse?.credential) {
            AuthAPI.getToken(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Google;
