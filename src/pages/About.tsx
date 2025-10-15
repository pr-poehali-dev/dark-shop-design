import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">О магазине</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">э-ЮНМРНСКА</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы — современный интернет-магазин электроники и гаджетов, который предлагает 
                широкий ассортимент смартфонов, ноутбуков и аксессуаров от ведущих мировых 
                производителей.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                С 2020 года мы помогаем нашим клиентам выбирать технику, которая соответствует 
                их потребностям и бюджету. Наша миссия — сделать технологии доступными для каждого.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name="Trophy" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">5+ лет</h3>
                <p className="text-muted-foreground">на рынке электроники</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">50 000+</h3>
                <p className="text-muted-foreground">довольных клиентов</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">1 000+</h3>
                <p className="text-muted-foreground">товаров в наличии</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Наши преимущества</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Icon name="ShieldCheck" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Официальная гарантия</h3>
                    <p className="text-muted-foreground">
                      Все товары с официальной гарантией производителя от 1 года
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Truck" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Быстрая доставка</h3>
                    <p className="text-muted-foreground">
                      Доставка по Москве в день заказа, по России — до 3 дней
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CreditCard" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Удобная оплата</h3>
                    <p className="text-muted-foreground">
                      Оплата картой, наличными или в рассрочку без переплат
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="HeadphonesIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Поддержка 24/7</h3>
                    <p className="text-muted-foreground">
                      Наша служба поддержки всегда готова помочь вам с выбором и оформлением заказа
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
