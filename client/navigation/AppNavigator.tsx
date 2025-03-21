import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AdminDrawerNavigator from './AdminDrawerNavigator'
import { router } from 'expo-router'


// const AppNavigator = ({ isAdmin }: { isAdmin: boolean }) => {
//     return isAdmin ? <AdminDrawerNavigator /> : <PublicBottomTabsNavigator />;
// };
const AppNavigator = () => {


  return (
    <AdminDrawerNavigator />
  );
}

export default AppNavigator