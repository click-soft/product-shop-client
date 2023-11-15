import React from 'react';
import styles from './SettingsLeftMenu.module.scss';
import { AiOutlineFileSearch } from 'react-icons/ai';
import GroupWrapper from '../../../ui/GroupWapper/GroupWrapper';
import MenuLink from './MenuLink/MenuLink';
import { BiUser } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  onClick?: () => void;
}

const SettingsLeftMenu: React.FC<Props> = ({ onClick }) => {
  return (
    <nav className={styles.container}>
      <MenuLink to="/" text="메인으로" icon={IoIosArrowBack} className={styles.link_main} onClick={onClick} />

      <GroupWrapper text="계정설정">
        <ul className={styles.group}>
          <li>
            <MenuLink to="./profile" text="프로필" icon={BiUser} onClick={onClick} />
          </li>
          {/* <li>
            <MenuLink to="./environment" text="환경설정" icon={AiOutlineFileSearch} onClick={onClick} />
          </li> */}
        </ul>
      </GroupWrapper>
    </nav>
  );
};

export default SettingsLeftMenu;
