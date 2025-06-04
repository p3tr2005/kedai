import { productsTable } from "../db/schema";
import { db } from "./db";

const products = [
  {
    imageUrl: "/BOBA_TARO.png",
    title: "Taro Boba",
    description:
      "A sweet and creamy taro-flavored boba drink with purple goodness. This delightful beverage blends the subtle earthiness of taro with smooth milk, creating a rich texture and unique taste that's perfect for any time of day.",
    price: 25000,
  },
  {
    imageUrl: "/BOBA_COKELAT.png",
    title: "Chocolate Boba",
    description:
      "Rich chocolate milk tea with chewy boba pearls. Made from premium cocoa and fresh milk, this drink delivers an indulgent chocolatey experience in every sip — perfect for sweet-tooth lovers and chocoholics alike.",
    price: 26000,
  },
  {
    imageUrl: "/BOBA_MANGGO.png",
    title: "Mango Boba",
    description:
      "Fresh mango blended into a tropical boba drink. Bursting with fruity flavor, this refreshing blend offers a sweet and tangy profile that's ideal for hot days or when you're craving something exotic and light.",
    price: 24000,
  },
  {
    imageUrl: "/BOBA_CAPPUCINNO.png",
    title: "Cappuccino Boba",
    description:
      "Bold coffee flavor mixed with creamy milk and chewy tapioca pearls. This drink is crafted for coffee lovers who enjoy a playful twist, offering the richness of cappuccino combined with the fun texture of boba.",
    price: 27000,
  },
  {
    imageUrl: "/BOBA_TIRRAMISSU.png",
    title: "Tiramisu Boba",
    description:
      "Inspired by the classic Italian dessert, this boba is rich with coffee, cocoa, and mascarpone flavors. Every sip captures the layered decadence of tiramisu, reimagined into a drink that's both elegant and satisfying.",
    price: 28000,
  },
];

export async function seed() {
  console.log("[SEEDING]");

  await db.delete(productsTable);

  await db.insert(productsTable).values(products);

  console.log("[SEED_COMPLETED]");
}
