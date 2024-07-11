const {
  searchToQuery,
  searchResultToDistributedCombinations,
} = require("../app/convert");

describe("Test searchToQuery", () => {
  it("should return a string", () => {
    expect(typeof searchToQuery("")).toBe("string");
  });

  it("should return a correct sql query", () => {
    const searchTerm = "McDonald's";
    const expectedValue = `
    SELECT 'City' as type, id, name FROM "Cities" 
    WHERE name ILIKE '%McDonald''s%'
   UNION ALL 
    SELECT 'Brand' as type, id, name FROM "Brands" 
    WHERE name ILIKE '%McDonald''s%'
   UNION ALL 
    SELECT 'DishType' as type, id, name FROM "DishTypes" 
    WHERE name ILIKE '%McDonald''s%'
   UNION ALL 
    SELECT 'Diet' as type, id, name FROM "Diets" 
    WHERE name ILIKE '%McDonald''s%'
  `;

    expect(searchToQuery(searchTerm)).toBe(expectedValue);
  });
});

describe("Test searchResultToDistributedCombinations", () => {
  it("should return an array when empty array is passed", () => {
    const result = searchResultToDistributedCombinations([]);
    expect(typeof result).toBe("object");
  });

  it("should return an empty array when empty array is passed", () => {
    const result = searchResultToDistributedCombinations([]);
    expect(result.length).toEqual(0);
  });

  it("should return correct result for test case 1", () => {
    const testData = [
      { type: "City", id: 1, name: "London" },
      { type: "Brand", id: 3, name: "Sushimania" },
      { type: "DishType", id: 1, name: "Sushi" },
    ];
    const result = searchResultToDistributedCombinations(testData);
    expect(result).toEqual([
      {
        city: {
          id: 1,
          name: "London",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
      },
    ]);
  });

  it("should return correct result for test case 2", () => {
    const testData = [
      { type: "City", id: 1, name: "London" },
      { type: "City", id: 2, name: "Manchester" },
      { type: "Brand", id: 3, name: "Sushimania" },
      { type: "DishType", id: 1, name: "Sushi" },
    ];

    const result = searchResultToDistributedCombinations(testData);
    expect(result).toEqual([
      {
        city: {
          id: 1,
          name: "London",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
      },
      {
        city: {
          id: 2,
          name: "Manchester",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
      },
    ]);
  });

  it("should return correct result for test case 3", () => {
    const testData = [
      { type: "City", id: 1, name: "London" },
      { type: "Brand", id: 3, name: "Sushimania" },
      { type: "DishType", id: 1, name: "Sushi" },
      { type: "Diet", id: 1, name: "Vegan" },
    ];

    const result = searchResultToDistributedCombinations(testData);
    expect(result).toEqual([
      {
        city: {
          id: 1,
          name: "London",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
        diet: {
          id: 1,
          name: "Vegan",
        },
      },
    ]);
  });

  it("should return correct result for test case 4", () => {
    const testData = [
      { type: "City", id: 1, name: "London" },
      { type: "Brand", id: 3, name: "Sushimania" },
      { type: "DishType", id: 1, name: "Sushi" },
      { type: "Diet", id: 1, name: "Vegan" },
      { type: "Diet", id: 2, name: "Vegetarian" },
    ];
    const result = searchResultToDistributedCombinations(testData);
    expect(result).toEqual([
      {
        city: {
          id: 1,
          name: "London",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
        diet: {
          id: 1,
          name: "Vegan",
        },
      },
      {
        city: {
          id: 1,
          name: "London",
        },
        brand: {
          id: 3,
          name: "Sushimania",
        },
        dishType: {
          id: 1,
          name: "Sushi",
        },
        diet: {
          id: 2,
          name: "Vegetarian",
        },
      },
    ]);
  });
});
