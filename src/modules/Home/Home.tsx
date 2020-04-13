import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {updateTab} from './Action';
import {useDispatch, useSelector} from 'react-redux';

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const {tab} = useSelector((state: {Home: any}) => ({
    tab: state.Home.tab,
  }));
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('drawerOpen', (e: any) => {
      // Do something
      console.warn('open', tab);
      dispatch(updateTab());
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'yellow',
      }}>
      <TouchableOpacity onPress={() => props.navigation.pop()}>
        <Text>Home</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('DrawerNavigator')}>
        <Text>Drawer</Text>
      </TouchableOpacity> */}
    </View>
  );
}
