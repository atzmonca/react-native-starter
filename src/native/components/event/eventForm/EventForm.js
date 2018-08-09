import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

import TextInput from '../../../../common/form/TextInput';

/**
 * Automatically adds the dashes required by the specified phone format and limits the input to ten characters
 */
const phoneFormatter = (number) => {
  if (!number) return '';
  // NNN-NNN-NNNN
  const splitter = /.{1,3}/g;
  number = number.substring(0, 10);
  return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};

/**
 * Remove dashes added by the formatter. We want to store phones as plain numbers
 */
const phoneParser = (number) => number ? number.replace(/-/g, '') : '';

/**
 * Force after min date
 */
const maxDateNormalize = (value, previousValue, values) => {
  const momentMinDate = moment(values.minDate, 'MM-DD-YYYY', true);
  const momentMaxDate = moment(value, 'MM-DD-YYYY', true);
  if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
    return value;
  }
  if (!momentMaxDate.isAfter(momentMinDate)) {
    return momentMinDate.add(1, 'd').format('MM-DD-YYYY');
  }
  return value;
};

/**
 * Force before max date
 */
const minDateNormalize = (value, previousValue, values) => {
  const momentMaxDate = moment(values.maxDate, 'MM-DD-YYYY', true);
  const momentMinDate = moment(value, 'MM-DD-YYYY', true);
  if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
    return value;
  }
  if (!momentMinDate.isBefore(momentMaxDate)) {
    return momentMaxDate.subtract(1, 'd').format('MM-DD-YYYY');
  }
  return value;
};

function EventForm(props) {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text>Phone number</Text>
      <Field
        name={'phoneNumber'}
        component={TextInput}
        placeholder={'NNN-NNN-NNNN'}
        format={phoneFormatter}
        parse={phoneParser}
      />
      <Text>Min date</Text>
      <Field
        name={'minDate'}
        component={TextInput}
        placeholder={'MM-DD-YYYY'}
        normalize={minDateNormalize}
      />
      <Text>Max date</Text>
      <Field
        name={'maxDate'}
        component={TextInput}
        placeholder={'MM-DD-YYYY'}
        normalize={maxDateNormalize}
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text>Submit!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


export default reduxForm({
  form: 'EventForm'
})(EventForm);