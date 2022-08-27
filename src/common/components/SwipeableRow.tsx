import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {}
function SwipeableRow(props: Props) {
  const [dimensions, setDimensions] = useState<boolean>();
  const translateX = new Animated.Value(0);

  const onContentLayout = (e: any) => {};

  const renderRowContent = () => {
    // We do this annoying if statement for performance.
    // We don't want the onLayout func to run after it runs once.
    if (dimensions) {
      return (
        <Animated.View
          //   manipulationModes={['translateX']}

          //   {...this._panResponder.panHandlers}
          style={{
            zIndex: 2,
            transform: [{translateX: translateX}],
          }}>
          {/* {this.renderVisibleContent()} */}
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          //   manipulationModes={['translateX']}
          //   {...this._panResponder.panHandlers}
          onLayout={e => onContentLayout(e)}
          style={{
            zIndex: 2,
            transform: [{translateX: translateX}],
          }}>
          {/* {renderVisibleContent()} */}
        </Animated.View>
      );
    }
  };
  return <View style={styles.wrapper}>{renderRowContent()}</View>;
}

export default SwipeableRow;

SwipeableRow.defaultProps = {};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});
