/* eslint-disable import/no-extraneous-dependencies, react/jsx-pascal-case, camelcase */
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TimePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import * as FormControl from './__formControl';
import { DISPLAY_NAME_PREFIX } from './__prefix';
import { deriveLabel, ITime, TIME_FORMAT_12, TIME_FORMAT_24 } from '../../types/controls';


export interface IProps {
  c: ITime;
}

export const secondLessViews: React.ComponentProps< typeof TimePicker >[ 'views' ] = [
  'hours', 'minutes',
];
export const allViews: React.ComponentProps< typeof TimePicker >[ 'views' ] = [
  'hours', 'minutes', 'seconds',
];

export const _: React.FC< IProps > = React.memo(({ c }) => {
  const { control } = useFormContext();
  const {
    attribute,
    amPmFormat,
    minutes_increment,
    allowSeconds,
  } = c;
  const uiTimeFormat = amPmFormat
    ? TIME_FORMAT_12
    : TIME_FORMAT_24;

  return (
    <Controller
      control={control}
      name={attribute}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const typedValue = value as ITime[ 'value' ];
        const compValue = typeof typedValue === 'string'
          ? new Date(`1970-01-01T${ value }`)
          : null;

        return (
          <FormControl._>
            <TimePicker
              label={deriveLabel(c)}
              error={error !== undefined}
              helperText={error?.message || ' '}
              value={compValue}
              onChange={d => d && onChange(format(d, TIME_FORMAT_24))}
              format={uiTimeFormat}
              inputVariant='outlined'
              ampm={Boolean(amPmFormat)}
              minutesStep={minutes_increment}
              views={allowSeconds ? allViews : secondLessViews}
            />
          </FormControl._>
        );
      }}
    />
  );
});
_.displayName = `${ DISPLAY_NAME_PREFIX }/Time`;
