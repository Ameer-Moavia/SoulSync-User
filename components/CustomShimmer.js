import React from 'react';
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/styles'; // Import your color constants

const ShimmerWithGradient = ({ children }) => (
  <LinearGradient
    colors={['#FFFFFF', '#E0E0E0', '#FFFFFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{ flex: 1 }}>
    {children}
  </LinearGradient>
);

const CustomShimmer = ({ style, duration = 1000 }) => (
  <ShimmerWithGradient>
    <ShimmerPlaceholder
      style={style}
      shimmerStyle={{ borderRadius: 10 }}
      duration={duration}
      autoRun={true}
    />
  </ShimmerWithGradient>
);

export default CustomShimmer;