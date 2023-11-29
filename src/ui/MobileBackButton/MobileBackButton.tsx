import IconButton from '../IconButton/IconButton';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useResizeWindow from '../../hooks/use-resize-window';

const MobileBackButton = () => {
  const { isMobile } = useResizeWindow();
  const navigate = useNavigate();

  function handleToBack(): void {
    navigate('..');
  }

  if (!isMobile) return <></>;

  return <IconButton icon={IoIosArrowBack} onClick={handleToBack} />;
};

export default MobileBackButton;
