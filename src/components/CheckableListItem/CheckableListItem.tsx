import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from '../Checkbox';
import TextButton from '../button/TextButton';
import { Text } from '@components';

interface CheckableListItemProps {
  checked: boolean;
}

interface CheckableListItemType extends FC<CheckableListItemProps> {
  Container?: () => JSX.Element;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const CheckableListItem: CheckableListItemType = ({
  checked,
}: CheckableListItemProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Checkbox checked={checked} />
      <View style={{ flex: 1 }}>
        <Text>{'aasdfasdf'}</Text>
        <View style={styles.container}>
          <Text>asdfasdf</Text>
          <TextButton text={'asfasd'} />
        </View>
      </View>
    </View>
  );
};

export default CheckableListItem;
