import React, { FC } from 'react';
import {
  Text,
  HorizontalView,
  TextButton,
  ListContent,
  Checkbox,
} from '@components';
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
