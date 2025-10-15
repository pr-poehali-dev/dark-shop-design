import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  const categories = [
    { name: "Смартфоны", icon: "Smartphone", category: "smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
    { name: "Ноутбуки", icon: "Laptop", category: "laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
    { name: "Аксессуары", icon: "Headphones", category: "accessories", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  ];

  const featuredProducts = [
    { id: 1, name: "iPhone 15 Pro", price: 89990, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", category: "smartphones" },
    { id: 2, name: "MacBook Pro 16", price: 249990, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", category: "laptops" },
    { id: 3, name: "AirPods Pro 2", price: 24990, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", category: "accessories" },
    { id: 4, name: "Samsung Galaxy S24", price: 79990, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", category: "smartphones" },
  ];

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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0" />
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Премиум электроника
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Смартфоны, ноутбуки и аксессуары от мировых брендов
          </p>
          <Link to="/catalog">
            <Button size="lg" className="text-lg px-8 py-6 hover-scale">
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.category} to={`/catalog?category=${cat.category}`}>
              <Card className="overflow-hidden hover-scale cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <Icon name={cat.icon as any} size={28} className="text-primary" />
                    <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Популярные товары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
      </section>

      <section className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="ShieldCheck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">Официальная гарантия на всю продукцию</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставка по Москве в день заказа</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="HeadphonesIcon" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-muted-foreground">Всегда на связи для решения ваших вопросов</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
