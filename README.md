# react-native-calender-pn-wix-extended
This is the extend version of the calendar developed by wix. Find full documentation in the link below:
link:https://github.com/wix/react-native-calendars

## IMPORTANT!!
Please install moment before installing the library for it uses moment for some features
link:https://github.com/moment/moment

Please install react-native-vector-icons before installing project for the library uses ionicons
link:https://github.com/oblador/react-native-vector-icons

## Installation 
add this to ur dependencies
```
          "dependencies": {
                    "react-native-calendars": "git+https://github.com/eals/react-native-calender-pn-wix-extended.git",
          }
```
## Changes :
- The month title bar is removed above days of the week
- The month section now contain upcomming next three months
- The banner section is added
- Banner section contains current date from moment and icon from react-native-vector-icons
- The days of the week now contains colored dot at the top
- When date is set to selected it gives red background to day
- When date is set to marked it gives green background to day
- When it is current date the day will have green border
- When current date is set to selected it will give red dot at the bottom

for eg:
```
<Calendar
          style={styles.calendar}
          current={'2017-10-01'}
          minDate={'2017-10-10'}
          maxDate={'2019-05-29'}
          firstDay={1}
          markedDates={{
            '2017-10-10': {marked: true},
            '2017-10-11': {marked: true},
            '2017-10-12': {marked: true},
            '2017-10-13': {marked: true},
            '2017-10-14': {selected: true},
            '2017-10-15': {selected: true},
            '2017-10-16': {marked: true},
            '2017-10-17': {marked: true},
            '2017-10-18': {marked: true},
            '2017-10-19': {marked: true},
            '2017-10-20': {selected: true},
            '2017-10-21': {marked: true},
            '2017-10-22': {marked: true},
            '2017-10-23': {marked: true},
            '2017-10-24': {marked: true},
            '2017-10-25': {selected: true},
            '2017-11-26': {disabled: true},
            '2017-10-26': {marked: true},
            '2017-10-27': {selected: true},

          }}
          hideArrows={false}
          theme={{
            arrowColor:"#fff",
            selectedDayBackgroundColor:"#EE1B25",
            todayTextColor: '#333333',
            dotColor: '#00BEA1',
          }}
        />
```

<img src="/demo/Screenshot_1509097897.png" width="50%"/>

