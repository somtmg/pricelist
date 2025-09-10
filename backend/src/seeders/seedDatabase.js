import Product from "../models/productModel.js";
async function seedDatabase() {
  try {
    // Check if table is empty or SEE_DATABASE is 'true'
    const shouldSeed = process.env.SEED_DATABASE === "true";

    if (!shouldSeed) {
      console.log(
        "Skipping seeding: Table already contains data and SEE_DATABASE is not set to true."
      );
      return;
    }

    await Product.bulkCreate([
      {
        article_no: "A001",
        product_name: "Wireless Mouse",
        in_price: 15.5,
        price: 29.99,
        unit: "piece",
        in_stock: 100,
        description: "Ergonomic wireless mouse with adjustable DPI settings.",
      },
      {
        article_no: "A002",
        product_name: "Mechanical Keyboard",
        in_price: 45.75,
        price: 89.99,
        unit: "piece",
        in_stock: 50,
        description: "RGB backlit mechanical keyboard with blue switches.",
      },
      {
        article_no: "A003",
        product_name: "USB-C Cable",
        in_price: 5.2,
        price: 12.99,
        unit: "piece",
        in_stock: 200,
        description: "Durable 2m USB-C cable with fast charging support.",
      },
      {
        article_no: "A004",
        product_name: "Monitor Stand",
        in_price: 22.3,
        price: 49.99,
        unit: "piece",
        in_stock: 30,
        description: "Adjustable monitor stand with cable management.",
      },
      {
        article_no: "A005",
        product_name: "Laptop Sleeve",
        in_price: 10.0,
        price: 24.99,
        unit: "piece",
        in_stock: 75,
        description: "Padded laptop sleeve for 15-inch laptops.",
      },
      {
        article_no: "A006",
        product_name: "External Hard Drive",
        in_price: 40.0,
        price: 79.99,
        unit: "piece",
        in_stock: 25,
        description: "1TB portable external hard drive with USB 3.0.",
      },
      {
        article_no: "A007",
        product_name: "Wireless Earbuds",
        in_price: 25.0,
        price: 59.99,
        unit: "pair",
        in_stock: 120,
        description: "True wireless earbuds with noise cancellation.",
      },
      {
        article_no: "A008",
        product_name: "HDMI Cable",
        in_price: 4.5,
        price: 14.99,
        unit: "piece",
        in_stock: 150,
        description: "4K HDMI cable, 3m length, gold-plated connectors.",
      },
      {
        article_no: "A009",
        product_name: "Desk Lamp",
        in_price: 12.8,
        price: 29.99,
        unit: "piece",
        in_stock: 40,
        description:
          "LED desk lamp with adjustable brightness and color temperature.",
      },
      {
        article_no: "A010",
        product_name: "Webcam",
        in_price: 30.0,
        price: 69.99,
        unit: "piece",
        in_stock: 60,
        description: "1080p webcam with built-in microphone for video calls.",
      },
      {
        article_no: "A011",
        product_name: "Mouse Pad",
        in_price: 3.5,
        price: 9.99,
        unit: "piece",
        in_stock: 200,
        description: "Non-slip mouse pad with smooth surface.",
      },
      {
        article_no: "A012",
        product_name: "USB Hub",
        in_price: 8.0,
        price: 19.99,
        unit: "piece",
        in_stock: 80,
        description: "4-port USB 3.0 hub with compact design.",
      },
      {
        article_no: "A013",
        product_name: "Gaming Chair",
        in_price: 90.0,
        price: 199.99,
        unit: "piece",
        in_stock: 15,
        description:
          "Ergonomic gaming chair with lumbar support and adjustable arms.",
      },
      {
        article_no: "A014",
        product_name: "Portable Charger",
        in_price: 18.0,
        price: 39.99,
        unit: "piece",
        in_stock: 90,
        description: "10000mAh portable power bank with dual USB ports.",
      },
      {
        article_no: "A015",
        product_name: "Laptop Stand",
        in_price: 15.0,
        price: 34.99,
        unit: "piece",
        in_stock: 45,
        description: "Adjustable aluminum laptop stand for improved airflow.",
      },
      {
        article_no: "A016",
        product_name: "Wireless Charger",
        in_price: 10.5,
        price: 24.99,
        unit: "piece",
        in_stock: 70,
        description: "Qi-compatible wireless charging pad for smartphones.",
      },
      {
        article_no: "A017",
        product_name: "Bluetooth Speaker",
        in_price: 20.0,
        price: 49.99,
        unit: "piece",
        in_stock: 55,
        description: "Portable Bluetooth speaker with 10-hour battery life.",
      },
      {
        article_no: "A018",
        product_name: "Screen Protector",
        in_price: 2.5,
        price: 9.99,
        unit: "piece",
        in_stock: 300,
        description: "Tempered glass screen protector for 15-inch laptops.",
      },
      {
        article_no: "A019",
        product_name: "Card Reader",
        in_price: 6.0,
        price: 14.99,
        unit: "piece",
        in_stock: 100,
        description: "Multi-format card reader for SD and microSD cards.",
      },
      {
        article_no: "A020",
        product_name: "Cooling Pad",
        in_price: 12.0,
        price: 29.99,
        unit: "piece",
        in_stock: 35,
        description: "Laptop cooling pad with dual fans and adjustable height.",
      },
    ]);
    console.log("Product seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

export default seedDatabase;
