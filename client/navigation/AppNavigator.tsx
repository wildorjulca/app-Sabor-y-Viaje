import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AdminDrawerNavigator from './AdminDrawerNavigator'
import { router } from 'expo-router'
import PublicBottomTabsNavigator from './PublicBottomTabsNavigator'


// const AppNavigator = ({ isAdmin }: { isAdmin: boolean }) => {
//     return isAdmin ? <AdminDrawerNavigator /> : <PublicBottomTabsNavigator />;
// };
const AppNavigator = () => {


  return (
    // <AdminDrawerNavigator />
    <PublicBottomTabsNavigator />
  );
}

export default AppNavigator