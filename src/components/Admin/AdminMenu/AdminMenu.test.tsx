import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AdminMenu from './AdminMenu';
import { LOGOUT } from '../../../graphql/mutates/auth';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { LocalStoragekey } from '../../../utils/enums';

const mocks = [
  {
    request: {
      query: LOGOUT,
      variables: {},
    },
    result: {
      data: {
        message: 'success',
      },
    },
  },
];

describe('test', () => {
  it('test', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <AdminMenu />
        </Router>
      </MockedProvider>
    );

    const linkEl = await screen.findByRole('button', { name: '로그아웃' });
    expect(linkEl).toBeInTheDocument();

    fireEvent.click(linkEl);

    // 로컬 스토리지에 임의의 값을 할당하는 코드 추가
    localStorage.setItem(LocalStoragekey.ACT, 'test');
    localStorage.setItem(LocalStoragekey.USR, 'test');

    // 비동기 처리가 완료될 때까지 대기하는 코드 추가
    await waitFor(() => {
      // 로컬 스토리지가 지워졌는지 확인하는 코드 추가
      expect(localStorage.getItem(LocalStoragekey.ACT)).toBeNull();
      expect(localStorage.getItem(LocalStoragekey.USR)).toBeNull();

      // 로그인 화면으로 이동했는지 확인하는 코드 추가
      const navigate = useNavigate();
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });
});
