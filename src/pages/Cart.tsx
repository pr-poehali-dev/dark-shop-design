import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  };

  const updateQuantity = (id: number, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-8">Добавьте товары из каталога</p>
          <Link to="/catalog">
            <Button size="lg">
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {item.price.toLocaleString()} ₽
                        </span>
                        <div className="flex items-center gap-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Итого</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>{total.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Итого</span>
                      <span className="text-primary">{total.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="w-full text-lg">
                  Оформить заказ
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
