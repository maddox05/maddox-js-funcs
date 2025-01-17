import test, { expect } from "playwright/test";
import {
  selectBinaryItemById,
  selectMultipleBinarySearch,
} from "../../functions";
import {
  apps,
  apps_state_gun_spin_issue,
  array_o_choices,
  classes_without_purdue_classes,
  one_choice,
  pdfs,
} from "./consts";

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

// test("expect selectBinaryItemById given an array of objects and a string key with no correct answer returns an empty array (doesnt fucking crash)", () => {
//   const result = selectBinaryItemById(pdfs, "id", "5");
//   expect(result).toEqual(null);
// });

test("expect selectBinaryItemById given a item to find in a sorted list finds the item and returns it", () => {
  const result = selectBinaryItemById(
    apps_state_gun_spin_issue,
    "title",
    "Gun-Spin"
  );
  console.log(result);
  expect(result).toEqual({
    id: 343,
    link: "https://gun-spin.github.io/file/",
    created_at: "2024-12-31T17:05:01.330718",
    title: "Gun-Spin",
    icon: "https://play-lh.googleusercontent.com/fLqvWSVq5rENEvu32xl0hf96wwSHVwQm-_9xc6KZg9Vgv9PbAtf1CyBYW7i1mlAXoSA",
    is_featured: false,
    upvotes: 0,
    downvotes: 0,
    desc: null,
    categories: "2D New",
  });
});

test("expect selectMultipleBinarySearch given one choice to find that choice and return it in an array", () => {
  const result = selectMultipleBinarySearch(one_choice, "question_id", 193);
  console.log(result);
  expect(result).toEqual([
    {
      id: 763,
      answer: "2x+1",
      is_correct: 1,
      created_by: 15,
      question_id: 193,
      type: "frq",
      class_id: 9,
      group_id: "77",
      school_id: 2,
      class_category: 2,
      num_submissions: null,
    },
  ]);
});

test("given a sorted array by a certain id run selectMutlipleBinarySearch, assert it retursn correct elems", () => {
  const result = selectMutlipleBinarySearch(array_o_choices, "question_id", 65);
  expect(result).toStrictEqual([
    {
      id: 289,
      answer: "[0, ∞)",
      is_correct: 0,
      created_by: 13,
      question_id: 65,
      type: "mcq",
      class_id: 6,
      group_id: 29,
      school_id: 1,
      class_category: 2,
    },
    {
      id: 290,
      answer: "(0, ∞)",
      is_correct: 1,
      created_by: 13,
      question_id: 65,
      type: "mcq",
      class_id: 6,
      group_id: 29,
      school_id: 1,
      class_category: 2,
    },
    {
      id: 291,
      answer: "[0, 1)",
      is_correct: 0,
      created_by: 13,
      question_id: 65,
      type: "mcq",
      class_id: 6,
      group_id: 29,
      school_id: 1,
      class_category: 2,
    },
    {
      id: 292,
      answer: "(1, ∞)",
      is_correct: 0,
      created_by: 13,
      question_id: 65,
      type: "mcq",
      class_id: 6,
      group_id: 29,
      school_id: 1,
      class_category: 2,
    },
    {
      id: 293,
      answer: "(-∞, ∞)",
      is_correct: 0,
      created_by: 13,
      question_id: 65,
      type: "mcq",
      class_id: 6,
      group_id: 29,
      school_id: 1,
      class_category: 2,
    },
  ]);
});
