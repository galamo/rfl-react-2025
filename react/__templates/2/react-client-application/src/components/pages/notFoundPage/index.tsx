import { useImageLoaded } from "../../../hooks/use-image-loaded";

export default function NotFoundPage() {
  const [image] = useImageLoaded(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUinX3N0rZjQ1mYFOCpJXcmJGgdvNm09ZAw&s"
  );
  return (
    <div>
      <img src={image} height={500} width={500} alt="" />
    </div>
  );
}
