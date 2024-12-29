import test, { expect } from "playwright/test";
import { selectBinaryItemById, selectMultipleBinarySearch } from "../functions";
import { apps, classes_without_purdue_classes } from "./consts";

test("expect selectMultipleBinarySearch given an array of objects and only 1 object to select and a string key to return an array of that one object", () => {
  const result = selectMultipleBinarySearch(apps, "title", "Stumble-Guys");
  console.log(result);
  expect(result.length).toBe(1);
});

test("expect selectMultipleBinarySearch given an array of objects and no correct object, returns an empty arr", () => {
  const result = selectMultipleBinarySearch(
    classes_without_purdue_classes,
    "school_id",
    1
  );
  console.log(result);
  expect(result.length).toBe(0);
});

test("expect selectBinaryItemById given an array of objects and only 1 object to select and a string key to return an array of that one object", () => {
  const result = selectBinaryItemById(apps, "title", "Stumble-Guys");
  console.log(result);
  expect(result).toEqual({
    id: 254,
    link: "https://ducklife.online/stumble-guys.embed",
    created_at: "2024-12-01T21:22:25.717467+00:00",
    title: "Stumble-Guys",
    icon: "https://raw.githubusercontent.com/duckmath/icons/refs/heads/main/stumble-guy.webp",
    is_featured: false,
    upvotes: 0,
    downvotes: 0,
    desc: null,
    categories: "Platformer",
  });
});
