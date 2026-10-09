import { render, fireEvent } from "@testing-library/react-native";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movie";

const movie: Movie = {
  id: "1",
  title: "Inception",
  genre: "Action",
  year: 2010,
  rating: 8.8,
  poster: "https://example.com/image.jpg",
  isShowing: true,
};

describe("MovieCard", () => {
  test("hiển thị thông tin phim", async () => {
    const { getByText } = await render(
      <MovieCard movie={movie} onSelect={() => {}} />,
    );

    expect(getByText("Inception")).toBeTruthy();
    expect(getByText("Action")).toBeTruthy();
    expect(getByText("2010")).toBeTruthy();
    expect(getByText("⭐8.8")).toBeTruthy();
    expect(getByText("✅ Đang chiếu")).toBeTruthy();
  });

  test("hiển thị điểm đánh giá ở chế độ tile", async () => {
    const { getByText } = await render(
      <MovieCard movie={movie} layout="tile" onSelect={() => {}} />,
    );

    expect(getByText("⭐ 8.8")).toBeTruthy();
  });

  test("nhấn phim gọi onSelect đúng ID", async () => {
    const onSelect = jest.fn();

    const { getByText } = await render(
      <MovieCard movie={movie} onSelect={onSelect} />,
    );

    await fireEvent.press(getByText("Inception"));

    expect(onSelect).toHaveBeenCalledWith("1");
  });

  test("hiển thị trạng thái ngừng chiếu", async () => {
    const { getByText } = await render(
      <MovieCard movie={{ ...movie, isShowing: false }} onSelect={() => {}} />,
    );

    expect(getByText("❌ Ngừng Chiếu")).toBeTruthy();
  });

  test("định dạng điểm đánh giá một chữ số thập phân", async () => {
    const { getByText } = await render(
      <MovieCard movie={{ ...movie, rating: 9 }} onSelect={() => {}} />,
    );

    expect(getByText("⭐9.0")).toBeTruthy();
  });
});
