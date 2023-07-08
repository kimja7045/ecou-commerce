import GoogleLoginBtn from '@/components/Common/Button/GoogleLoginBtn';
import styled from '@emotion/styled';
import React from 'react';

const LoginPage = () => {
  return (
    <Container>
      <GoogleLoginBtn />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
