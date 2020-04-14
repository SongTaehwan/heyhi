import React, { FC } from 'react';
import Text from '../Text';
import HorizontalView from '../layout/HorizontalView';
import Checkbox from '../Checkbox';
import ListContent from '../layout/HorizontalView';
import TextButton from '../button/TextButton';
import { HorizontalViewType } from '../layout/HorizontalView';

interface CheckableListItemProps {
  checked: boolean;
}

interface CheckableListItemType extends FC<CheckableListItemProps> {
  Container?: HorizontalViewType;
}

const CheckableListItem: CheckableListItemType = ({
  checked = true,
}: CheckableListItemProps): JSX.Element => {
  return (
    <HorizontalView>
      <Checkbox large checked={checked} />
      <ListContent>
        <HorizontalView>
          <Text>asdfasdf</Text>
          <TextButton text={'asfasd'} />
        </HorizontalView>
      </ListContent>
    </HorizontalView>
  );
};

export default CheckableListItem;
