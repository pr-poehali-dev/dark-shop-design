import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Главная", icon: "Home" },
    { path: "/catalog", label: "Каталог", icon: "ShoppingBag" },
    { path: "/about", label: "О магазине", icon: "Info" },
    { path: "/contacts", label: "Контакты", icon: "Mail" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Icon name="Zap" className="text-primary" size={28} />
              э-ЮНМРНСКА
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:block">
                <Icon name="Search" size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </button>
              <button className="hidden md:block">
                <Icon name="User" size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </button>
              <Link to="/cart" className="relative">
                <Icon name="ShoppingCart" size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">э-ЮНМРНСКА</h3>
              <p className="text-sm text-muted-foreground">
                Магазин электроники и гаджетов премиум качества
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/catalog?category=smartphones" className="hover:text-primary transition-colors">Смартфоны</Link></li>
                <li><Link to="/catalog?category=laptops" className="hover:text-primary transition-colors">Ноутбуки</Link></li>
                <li><Link to="/catalog?category=accessories" className="hover:text-primary transition-colors">Аксессуары</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">О магазине</Link></li>
                <li><Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@e-shop.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 э-ЮНМРНСКА. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
