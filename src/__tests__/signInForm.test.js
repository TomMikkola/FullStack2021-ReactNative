import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../components/SignInForm';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const {getByTestId} = render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText( getByTestId('usernameInput'), 'kalle' );
      fireEvent.changeText( getByTestId('passwordInput'), 'password' );
      fireEvent.press( getByTestId('submitButton') );

      await waitFor( () => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          name: 'kalle',
          password: 'password'
        });
      })
      
    })
  })
  
});