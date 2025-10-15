import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 89990, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", category: "smartphones" },
    { id: 2, name: "Samsung Galaxy S24", price: 79990, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", category: "smartphones" },
    { id: 3, name: "Xiaomi 14 Pro", price: 54990, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400", category: "smartphones" },
    { id: 4, name: "MacBook Pro 16", price: 249990, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", category: "laptops" },
    { id: 5, name: "Dell XPS 15", price: 129990, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400", category: "laptops" },
    { id: 6, name: "Lenovo ThinkPad X1", price: 149990, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400", category: "laptops" },
    { id: 7, name: "AirPods Pro 2", price: 24990, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", category: "accessories" },
    { id: 8, name: "Sony WH-1000XM5", price: 34990, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", category: "accessories" },
    { id: 9, name: "Magic Keyboard", price: 12990, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", category: "accessories" },
    { id: 10, name: "Google Pixel 8 Pro", price: 69990, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400", category: "smartphones" },
    { id: 11, name: "Asus ROG Zephyrus", price: 189990, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400", category: "laptops" },
    { id: 12, name: "Logitech MX Master 3", price: 8990, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", category: "accessories" },
  ];

  const categories = [
    { id: "all", name: "Все товары", icon: "Grid3x3" },
    { id: "smartphones", name: "Смартфоны", icon: "Smartphone" },
    { id: "laptops", name: "Ноутбуки", icon: "Laptop" },
    { id: "accessories", name: "Аксессуары", icon: "Headphones" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Каталог товаров</h1>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex items-center gap-2"
            >
              <Icon name={cat.icon as any} size={18} />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-scale">
              <div className="relative h-64 overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <Button size="sm" onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
