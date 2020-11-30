import { Box } from "@chakra-ui/react";

import { useColorModeValue } from "../hooks/chakra";

export function Ball({ size = 24, blur = 0, ...props }) {
  return (
    <Box
      size={size}
      style={{ filter: `blur(${blur}px)` }}
      bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
  linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)"
      borderRadius="full"
      {...props}
    />
  );
}

export function BlueBall(props) {
  const bgImage = useColorModeValue(
    "radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%), linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)",
    "radial-gradient(50% 50% at 50% 50%,rgba(33,107,255,0) 79.17%,rgb(171 199 255 / 11%) 100%), linear-gradient(216.53deg,#345aa6 14.79%,#113681 29.44%,#010624 85.11%)"
  );
  return <Ball bgImage={bgImage} {...props} />;
}

export function GreenBall(props) {
  const bgImage = useColorModeValue(
    "radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%), linear-gradient(216.53deg, #D2FCE3 14.79%, #6BE99D 29.44%, #02451D 85.11%)",
    "radial-gradient(50% 50% at 50% 50%,rgba(33,107,255,0) 79.17%,rgb(171 199 255 / 16%) 100%),linear-gradient(216.53deg,#087332 14.79%,#04662b 29.44%,#00200d 85.11%)"
  );
  return <Ball bgImage={bgImage} {...props} />;
}

export function OrangeBall(props) {
  const bgImage = useColorModeValue(
    "radial-gradient(50% 50% at 50% 50%, rgba(255, 140, 33, 0) 79.17%, rgba(255, 231, 171, 0.26) 100%), linear-gradient(216.53deg, #DFBE2B 14.79%, #F49E5F 29.44%, #E06A66 85.11%)",
    "radial-gradient(50% 50% at 50% 50%,rgba(255,140,33,0) 79.17%,rgba(255,231,171,0.26) 100%),linear-gradient(216.53deg,#8f770d 14.79%,#773708 29.44%,#490806 85.11%)"
  );
  return <Ball bgImage={bgImage} {...props} />;
}

export function TealBall(props) {
  const bgImage = useColorModeValue(
    "radial-gradient(50% 50% at 50% 50%, rgba(33, 175, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%), linear-gradient(216.53deg, #AEE5FC 14.79%, #2AB1EB 29.44%, #013D57 85.11%)",
    "radial-gradient(50% 50% at 50% 50%,rgba(33,175,255,0) 79.17%,rgba(171,199,255,0.26) 100%),linear-gradient(216.53deg,#237ba0 14.79%,#054d6c 29.44%,#011620 85.11%)"
  );
  return <Ball bgImage={bgImage} {...props} />;
}
