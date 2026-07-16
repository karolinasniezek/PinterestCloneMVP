export interface Pin {
  id: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  isFavorite: boolean;
  boardId?: number;
}
