import Svg, { Rect, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

// The Flex "F" mark from the Stitch design
// (stitch_simple_classroom_manager/flex_academic_logo).
export default function Logo({ size = 28 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="flexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#3b52e8" />
          <Stop offset="100%" stopColor="#2135b7" />
        </LinearGradient>
      </Defs>
      <Rect width="100" height="100" rx="24" fill="url(#flexGrad)" />
      <Path
        d="M30 26 h40 a6 6 0 0 1 6 6 v2 a6 6 0 0 1 -6 6 H42 v12 h24 a6 6 0 0 1 6 6 v2 a6 6 0 0 1 -6 6 H42 v16 a5 5 0 0 1 -10 0 V31 a5 5 0 0 1 5 -5 z"
        fill="#ffffff"
      />
      <Circle cx="74" cy="30" r="4" fill="#60a5fa" />
    </Svg>
  );
}
