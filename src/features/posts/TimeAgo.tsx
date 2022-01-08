import React from 'react';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {Text} from 'react-native';

const TimeAgo = ({timestamp}: {timestamp: string}) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return <Text style={{fontSize: 12}}>&nbsp; {timeAgo}</Text>;
};

export default TimeAgo;
