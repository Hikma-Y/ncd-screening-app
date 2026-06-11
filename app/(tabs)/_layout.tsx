import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeProvider } from "@/components";
export default function TabLayout() {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
	  tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#137fecff",
            borderRadius: 20,
            paddingVertical:10,
            marginHorizontal: 0,
            marginBottom: 40,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#cbc9dfff",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="home"
                size={focused ? 34 : 30}
                color={focused ? "#000" : "#555"}
              />
            ),
          }}
        />
	<Tabs.Screen
		name="forms/findrisc_form"
		options={{href:null}}
	/>
        <Tabs.Screen
		name="forms/thyroid_test"
		options={{href:null}}
	/>
	<Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="settings"
                size={focused ? 34 : 30}
                color={focused ? "#000" : "#555"}
              />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
