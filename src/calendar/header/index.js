import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../../../components/theme';
import moment from 'moment';


class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  nextMonth(next){
    var month = ["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"];

      return month[next-1];
  }

  twoMonth(next){
    var month = ["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb"];
      return month[next-1];
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    return false;
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.substractMonth}
          style={this.style.arrow}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Image
                source={require('../img/previous.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Image
                source={require('../img/next.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View style={{}}>
      <Image style={this.style.proBg} source={require('../img/proBgg.png')}>
        <View style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:-25}}>
          {leftArrow}
          <Text style={{color:"#fff",fontSize:18,alignSelf:'flex-end',marginBottom:35,marginRight:25,borderBottomWidth:1,borderColor:'#fff'}}>
            {this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMM')}
          </Text>
          <Text style={{color:"#DBAEAF",fontSize:18,alignSelf:'flex-end',marginBottom:35,marginRight:25}}>
            {this.nextMonth(this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'M'))}
          </Text>
          <Text style={{color:"#C36D6F",fontSize:18,alignSelf:'flex-end',marginBottom:35,}}>
            {this.twoMonth(this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'M'))}
          </Text>
          {rightArrow}
          <View style={{flexDirection:'column',flex:1}}>
            <View style={{alignSelf:'flex-end'}}>
              <Text style={{fontSize:18,alignSelf:'center',color:"#fff"}}>
                {moment().format("MMMM")}
              </Text>
              <Text style={{fontSize:22,alignSelf:'center',color:"#fff"}}>
                {moment().format("DD, YYYY")}
              </Text>
              <View style={{width: 80, alignSelf:'center',height:80,borderRadius:40,backgroundColor:"white",borderRadius:40,borderWidth:5,borderColor:'rgba(193, 192, 192, 0.53)',justifyContent:'center'}}>
                <Icon size={42} name="ios-calendar" style={{color: theme.themeColor, alignSelf:'center' }} />
              </View>
            </View>
          </View>
        </View>
      </Image>
      <View style={{borderBottomWidth:1,borderColor:'#ECECEC',marginBottom:10,paddingBottom:10,backgroundColor:"#F9F9F9"}}>
        {
          !this.props.hideDayNames &&
          <View style={this.style.week}>
            {weekDaysNames.map((day, idx) => {
              if(moment().format("ddd") == day){
                return(
                  <View key={idx} style={{flexDirection:'column'}}>
                    <View style={{height:15,width:15,borderRadius:10,backgroundColor:"#E81B21",alignSelf:'center',borderWidth:2,borderColor:"#F6CDCE",marginBottom:10,paddingBottom:10}}></View>
                    <Text  style={[this.style.dayHeader,{color:"#E81B21"}]} numberOfLines={1}>{day.toUpperCase()}</Text>
                  </View>
                )
              }
              else {
                return(
                <View key={idx} style={{flexDirection:'column'}}>
                  <View style={{height:15,width:15,borderRadius:10,backgroundColor:"#BBBBBB",alignSelf:'center',marginBottom:10,paddingBottom:10}}></View>
                  <Text  style={[this.style.dayHeader,{color:"#626262"}]} numberOfLines={1}>{day.toUpperCase()}</Text>
                </View>
              )}
            })}
          </View>
        }
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
