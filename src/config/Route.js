import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SongsList from '../container/SongsList';
import Splash from '../components/SplashScreen';
import SongDetail from '../container/SongDetail';

const Stack = createStackNavigator();
const Route = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SongsList" component={SongsList} />
      <Stack.Screen name="SongDetail" component={SongDetail} />
    </Stack.Navigator>
  );
};

export default Route;
