import { createContext } from "react";
interface ImageContextType {
  isUpload: boolean;
  setIsUpload: (isUpload: boolean) => void;
}

const ImageContext = createContext<ImageContextType>({
  isUpload: false,
  setIsUpload: () => {},
});

export default ImageContext;
