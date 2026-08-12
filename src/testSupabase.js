import { createWish } from "./services/wishService";

const testCreateWish = async () => {
  try {
    const wish = await createWish(
      "Test User",
      "Happy birthday Koko! 🎂❤️"
    );

    console.log("✅ Wish successfully saved!");
    console.log("Saved wish:", wish);
  } catch (error) {
    console.error("❌ Failed to save wish:", error);
  }
};

testCreateWish();