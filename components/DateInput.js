import React, {useState, useMemo} from 'react';
import {Platform, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import dayjs from 'dayjs';

const FORMAT = 'DD/MM/YYYY';

const DateInput = ({label, value, onChange}) => {
  const valueText = useMemo(() => dayjs(value).format(FORMAT), [value]);
  const [dpVisible, setDpVisible] = useState(false);

  return (
    <>
      <TextInput
        label={label}
        value={valueText}
        onFocus={() => {
          Keyboard.dismiss();
          setDpVisible(true);
        }}
      />
      {dpVisible && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setDpVisible(Platform.OS === 'ios');
            onChange(selectedDate);
          }}
        />
      )}
    </>
  );
};

export default DateInput;
