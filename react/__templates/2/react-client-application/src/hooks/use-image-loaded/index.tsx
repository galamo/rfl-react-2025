import { useEffect, useState } from "react";

export function useImageLoaded(initUrl: string) {
  const [currentImage, setCurrentImage] = useState(initUrl);
  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  useEffect(() => {
    function testImage() {
      const imgDom = new Image();
      imgDom.onerror = () => {
        setCurrentImage(defaultImage);
      };
      imgDom.src = currentImage;
    }
    testImage();
  }, []);
  return [currentImage];
}
