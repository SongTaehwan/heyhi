import React from 'react';
import CheckableListContent from './CheckableListContent';
import HorizontalView from '../layout/HorizontalView';
import Checkbox from '../Checkbox';
import { CheckableListItemType, CheckableListItemProps } from '../types';

const CheckableListItem: CheckableListItemType = ({
  children,
  checked = true,
  title,
  showCheckbox = true,
  onPressCheckbox,
  onPressTextButton,
  horizontalAlign,
  verticalAlign,
  ...rest
}: CheckableListItemProps): JSX.Element => {
  return (
    <HorizontalView
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}>
      {showCheckbox && (
        <Checkbox checked={checked} onPress={onPressCheckbox} {...rest} />
      )}
      {children || (
        <CheckableListContent title={title} onPress={onPressTextButton} />
      )}
    </HorizontalView>
  );
};

CheckableListItem.Checkbox = Checkbox;
CheckableListItem.ListItem = CheckableListContent;

export default CheckableListItem;
