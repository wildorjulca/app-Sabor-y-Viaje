import React from 'react'
import PublicBottomTabsNavigator from '@/navigation/PublicBottomTabsNavigator'
import PublicStack from '@/navigation/PublicStack'
import { NavigationContainer } from '@react-navigation/native';
import AdminDrawerNavigator from '@/navigation/AdminDrawerNavigator';
const index = () => {
  return (
    // <NavigationContainer>
    <PublicStack />
    // <AdminDrawerNavigator />
    // </NavigationContainer>

  )
}

export default index