import { ImageSourcePropType } from "react-native";

export type bookImage = {
    source: ImageSourcePropType | string 
}

export interface Book {
    source: bookImage;
    title: string;
    author: string;
    price: number;
}
  
export interface BookCardItemProps {
    book: Book;
}