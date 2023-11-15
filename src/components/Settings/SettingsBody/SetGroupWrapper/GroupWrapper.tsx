import React from 'react';
import GroupWrapper, { GroupWrapperProps } from '../../../../ui/GroupWapper/GroupWrapper';

const SetGroupWrapper: React.FC<GroupWrapperProps> = (props) => {
  return <GroupWrapper {...props} padding={'0 0 0.7rem 0'} />;
};

export default SetGroupWrapper;
