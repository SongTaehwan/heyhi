enum Colors {
  transparent = 'transparent',
  aliceBlue = '#e5f1ff',
  black = '#000000',
  brownGrey = '#7B7B7B',
  blueyGrey = '#8898aa',
  brightRed = '#F76C6C',
  brownishGrey = '#5A5A5A',
  brightPurple = '#BC25FF',
  brightSkyBlue = '#00c7ff',
  brightSeaGreen = '#00ffa7',
  caramel = '#ffd19d',
  columbiaBlue = '#9ECAFF',
  cornflowerBlue = '#a3eaff',
  caribbeanGreen = '#9de9ff',
  deepSkyBlue = '#0076FF',
  darkSlateBlue = '#172b4d',
  grapeFruit = '#ff5353',
  grapefruit = '#FF5353',
  lightCyan = '#E5F9FF',
  purpley = '#7764e4',
  pumpkinOrange = '#ff9b26',
  mauve = '#e19dff',
  magnolia = '#F7E5FF',
  matterhorn = '#4b4b4b',
  mediumSpringGreen = '#09ECAF',
  red = '#ff0000',
  robinSEgg = '#5adbff',
  seashell = '#FFF3E5',
  taupeGray = '#888888',
  vibrantBlue = '#0045ff',
  veryLightPink = '#cecece',
  veryLightPinkTwo = '#efefef',
  veryLightPinkFour = '#E6E6E6',
  veryLightPinkThree = '#f2f2f2',
  white = '#ffffff',
}

type ShadowProps = {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  radius?: number;
  elevation?: number;
};

type ShadowStyle = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

namespace Colors {
  export function setRGBA(
    red: number,
    green: number,
    blue: number,
    alpha: number,
  ): string {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  export function drawShadow({
    color = Colors.black,
    width = 2,
    height = 5,
    opacity = 0.5,
    radius = 10,
    elevation = 3,
  }: ShadowProps): ShadowStyle {
    return {
      shadowColor: color,
      shadowOffset: {
        width,
        height,
      },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation,
    };
  }
}

export default Colors;
