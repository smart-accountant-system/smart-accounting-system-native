import React from 'react';
import i18n from 'i18n-js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import FilterHeader from './FilterHeader';
import FilterBody from './FilterBody';
import FilterField from './FilterField';
import FilterTime from './FilterTime';
import { FeatherIcon } from '..';
import theme from '../../constants/theme';

export { default as FilterHeader } from './FilterHeader';
export { default as FilterBody } from './FilterBody';
export { default as FilterField } from './FilterField';
export { default as FilterTime } from './FilterTime';

export default ({
  isExpand,
  filterHeight,
  isDatePickerVisible,
  fromDate,
  toDate,

  hideDateTimePicker,
  handleDatePicked,
  handlePressFilter,
  showDateTimePicker,
  activatingDate,
  doFilter,
}) => (
  <View>
    <FilterHeader isExpand={isExpand} onPress={handlePressFilter} />

    <FilterBody height={filterHeight}>
      <FilterField first>
        <FilterTime
          title={i18n.t('from')}
          first
          date={fromDate.toLocaleDateString(i18n.t('local'))}
          showDateTimePicker={showDateTimePicker}
        />
        <FilterTime
          title={i18n.t('to')}
          second
          date={toDate.toLocaleDateString(i18n.t('local'))}
          showDateTimePicker={showDateTimePicker}
        />
      </FilterField>

      <FilterField height="52">
        <FeatherIcon color="#f1f1f1" name="user" />
        <Button mode="contained" onPress={doFilter}>
          <Text style={{ color: theme.colors.white }}>
            {i18n.t('doFilter')}
          </Text>
        </Button>
      </FilterField>
    </FilterBody>

    <DateTimePicker
      isVisible={isDatePickerVisible}
      date={activatingDate === i18n.t('from') ? fromDate : toDate}
      onConfirm={handleDatePicked}
      onCancel={hideDateTimePicker}
    />
  </View>
);
