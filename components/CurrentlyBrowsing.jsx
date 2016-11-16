import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const style = {
  box: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8
  },
  currentTermText: {
    fontWeight: 'bold',
    fontSize: 18
  }
};

const CurrentlyBrowsing = () => (
  <div style={style.box} >
    <div style={style.currentTermText}>Currently Browsing </div>
    <FontIcon className="material-icons">chevron_right</FontIcon>
  </div>
);

export default CurrentlyBrowsing;
