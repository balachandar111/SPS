// Background images for the .page-hero::after carousel. Exactly 6 per page
// (the CSS keyframes define 6 slots: --s1 ... --s6). Swap any URL freely.
const u = (p) => `https://savitrigroup.in/wp-content/uploads/${p}`;

export const heroSlides = {
  // The same banners used by the home-page slider on savitrigroup.in
  products: [
    u('2025/07/banner5.jpg'),
    u('2025/05/banner1.jpg'),
    u('2025/05/banner2.jpg'),
    u('2025/05/banner4.jpg'),
    u('2025/05/banner6.jpg'),
    u('2025/05/banner3-1.jpg'),
  ],
  home: [
    u('2025/05/banner1.jpg'),
    u('2025/05/banner3-1.jpg'),
    u('2025/07/banner5.jpg'),
    u('2025/05/banner6.jpg'),
    u('2025/05/banner2.jpg'),
    u('2025/05/banner4.jpg'),
  ],
  contact: [
    u('2017/05/44.jpg'),
    u('2021/01/Infrastructure.jpg'),
    u('2017/05/1.jpg'),
    u('2017/05/mission.jpg'),
    u('2017/05/45.jpg'),
    u('2017/05/vision.jpg'),
  ],
  // Infrastructure, gallery and heritage imagery from the About / Infrastructure pages
  about: [
    u('2021/01/Infrastructure.jpg'),
    u('2017/05/45.jpg'),
    u('2017/05/heritage.jpg'),
    u('2017/05/44.jpg'),
    u('2017/05/responsibility.jpg'),
    u('2017/05/1.jpg'),
  ],
};

export const SLIDE_SECONDS = 6; // time each slide is on screen