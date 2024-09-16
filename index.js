import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = async ({ name, hex, compName, compHex }) => {
  try {
    const response = await fetch(COLORS);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    if (name) {
      const lowerCaseName = name.toLowerCase();
      const result = json.filter(
        (color) => color.name.toLowerCase().includes(lowerCaseName)
      );
      return result;
    } else if (hex) {
      const result = json.filter((color) => color.hex === hex);
      return result;
    } else if (compName) {
      const lowerCaseCompName = compName.toLowerCase();
      const result = json.filter((color) =>
        color.comp.some(
          (compColor) => compColor.name.toLowerCase().includes(lowerCaseCompName)
        )
      );
      return result;
    } else if (compHex) {
      const result = json.filter((color) =>
        color.comp.some(
          (compColor) => compColor.hex === compHex
        )
      );
      return result;
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Leave this here
export default fetchColors;
