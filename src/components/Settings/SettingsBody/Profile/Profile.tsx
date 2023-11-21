import Accordion from '../../../../ui/Accordion/Accordion';
import GroupWrapper from '../../../../ui/GroupWapper/GroupWrapper';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import ChangePassword from './ChangePassword/ChangePassword';
import useGetLoginedUser from '../../../../hooks/use-get-logined-user';

const Profile = () => {
  const user = useGetLoginedUser();

  return (
    <div>
      <GroupWrapper text="계정 정보" fontSize="var(--fs-lg)" padding={'0 0 2rem 0'}>
        <Accordion title={user?.email!} description={'이메일 주소 변경'} rounded="only-top">
          <ChangeEmail />
        </Accordion>
        <Accordion title={'비밀번호 변경'} description={'비밀번호 변경하기'} rounded="only-bottom" separator={true}>
          <ChangePassword />
        </Accordion>
      </GroupWrapper>
    </div>
  );
};

export default Profile;
