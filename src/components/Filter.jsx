import React from "react";
import { Picker } from '@react-native-picker/picker';
import theme from "../theme";

const Filter = ({ sortBy, setSortBy }) => {
  return (
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue) => {
        setSortBy(itemValue);
      }}
    >
      <Picker.Item label="Select an item..." value="default" color={theme.colors.textSecondary} enabled={false} />
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )
};

export default Filter;