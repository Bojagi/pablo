interface Fluid {
  minScreen: number;
  maxScreen: number;
  minBaseSize: number;
  maxBaseSize: number;
  minRatio: number;
  maxRatio: number;
}

const fluid: Fluid = {
  minScreen: 20, // 320px in rem
  maxScreen: 90, // 1440px in rem
  minBaseSize: 1,
  maxBaseSize: 1.125,
  minRatio: 1.3,
  maxRatio: 1.7,
};

export { fluid, type Fluid };
