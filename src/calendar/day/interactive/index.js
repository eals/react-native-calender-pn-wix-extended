import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import _ from 'lodash';
import {
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import * as defaultStyle from '../../../style';
import styleConstructor from './style';

class Day extends Component {
  static propTypes = {
    // TODO: selected + disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marked: PropTypes.any,

    onPress: PropTypes.func,
    day: PropTypes.object,

    markingExists: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.theme = {...defaultStyle, ...(props.theme || {})};
    this.style = styleConstructor(props.theme);
    this.markingStyle = this.getDrawingStyle(props.marked);
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.day);
  }

  shouldComponentUpdate(nextProps) {
    const newMarkingStyle = this.getDrawingStyle(nextProps.marked);

    if (JSON.stringify(this.markingStyle) !== JSON.stringify(newMarkingStyle)) {
      this.markingStyle = newMarkingStyle;
      return true;
    }

    return ['state', 'children'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
  }

  getDrawingStyle(marking) {
    if (!marking) {
      return {};
    }
    return marking.reduce((prev, next) => {
      prev.textStyle = {};
      if (next.quickAction) {
        if (next.first || next.last) {
          prev.containerStyle = this.style.firstQuickAction;
          prev.textStyle = this.style.firstQuickActionText;
          if (next.endSelected && next.first && !next.last) {
            prev.rightFillerStyle = '#c1e4fe';
          } else if (next.endSelected && next.last && !next.first) {
            prev.leftFillerStyle = '#c1e4fe';
          }
        } else if (!next.endSelected) {
          prev.containerStyle = this.style.quickAction;
          prev.textStyle = this.style.quickActionText;
        } else if (next.endSelected) {
          prev.leftFillerStyle = '#c1e4fe';
          prev.rightFillerStyle = '#c1e4fe';
        }
        return prev;
      }

      const color = next.color;
      if (next.status === 'NotAvailable') {
        prev.textStyle = this.style.naText;
      }
      if (next.startingDay) {
        prev.startingDay = {
          color
        };
      }
      if (next.endingDay) {
        prev.endingDay = {
          color
        };
      }
      if (!next.startingDay && !next.endingDay) {
        prev.day = {
          color
        };
      }
      if (next.textColor) {
        prev.textStyle.color = next.textColor;
      }
      return prev;
    }, {});
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    let leftFillerStyle = {};
    let rightFillerStyle = {};
    let fillerStyle = {};
    let fillers;

    if (this.props.state === 'disabled') {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      textStyle.push(this.style.todayText);
    }

    if (this.props.marked) {
      containerStyle.push({
        borderRadius: 17
      });

      const flags = this.markingStyle;
      if (flags.textStyle) {
        textStyle.push(flags.textStyle);
      }
      if (flags.containerStyle) {
        containerStyle.push(flags.containerStyle);
      }
      if (flags.leftFillerStyle) {
        leftFillerStyle.backgroundColor = flags.leftFillerStyle;
      }
      if (flags.rightFillerStyle) {
        rightFillerStyle.backgroundColor = flags.rightFillerStyle;
      }

      if (flags.startingDay && !flags.endingDay) {
        leftFillerStyle = {
          backgroundColor: this.theme.calendarBackground
        };
        rightFillerStyle = {
          backgroundColor: flags.startingDay.color
        };
        containerStyle.push({
          backgroundColor: flags.startingDay.color
        });
      } else if (flags.endingDay && !flags.startingDay) {
        rightFillerStyle = {
          backgroundColor: this.theme.calendarBackground
        };
        leftFillerStyle = {
          backgroundColor: flags.endingDay.color
        };
        containerStyle.push({
          backgroundColor: flags.endingDay.color
        });
      } else if (flags.day) {
        leftFillerStyle = {backgroundColor: flags.day.color};
        rightFillerStyle = {backgroundColor: flags.day.color};
        // #177 bug
        fillerStyle = {backgroundColor: flags.day.color};
      } else if (flags.endingDay && flags.startingDay) {
        rightFillerStyle = {
          backgroundColor: this.theme.calendarBackground
        };
        leftFillerStyle = {
          backgroundColor: this.theme.calendarBackground
        };
        containerStyle.push({
          backgroundColor: flags.endingDay.color
        });
      }

      fillers = (
        <View style={[this.style.fillers, fillerStyle]}>
          <View style={[this.style.leftFiller, leftFillerStyle]}/>
          <View style={[this.style.rightFiller, rightFillerStyle]}/>
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.onDayPress}>
        <View style={this.style.wrapper}>
          {fillers}
          <View style={containerStyle}>
            <Text style={textStyle}>{String(this.props.children)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Day;
