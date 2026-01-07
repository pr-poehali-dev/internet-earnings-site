import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import AdBlock from "@/components/AdBlock";

const Index = () => {
  const navigate = useNavigate();
  const methods = [
    {
      name: "Фриланс",
      income: "30 000 - 150 000 ₽",
      investment: "0 - 5 000 ₽",
      difficulty: "Средне",
      time: "1-2 месяца",
      icon: "Briefcase",
      color: "bg-primary"
    },
    {
      name: "Инфобизнес",
      income: "50 000 - 500 000 ₽",
      investment: "10 000 - 50 000 ₽",
      difficulty: "Сложно",
      time: "3-6 месяцев",
      icon: "GraduationCap",
      color: "bg-secondary"
    },
    {
      name: "Инвестиции",
      income: "5% - 25% годовых",
      investment: "от 50 000 ₽",
      difficulty: "Средне",
      time: "От 1 года",
      icon: "TrendingUp",
      color: "bg-accent"
    },
    {
      name: "Блогинг",
      income: "20 000 - 300 000 ₽",
      investment: "5 000 - 30 000 ₽",
      difficulty: "Средне",
      time: "4-8 месяцев",
      icon: "Video",
      color: "bg-primary"
    },
    {
      name: "Дропшиппинг",
      income: "40 000 - 200 000 ₽",
      investment: "20 000 - 100 000 ₽",
      difficulty: "Сложно",
      time: "2-4 месяца",
      icon: "ShoppingCart",
      color: "bg-secondary"
    }
  ];

  const articles = [
    {
      title: "Как заработать первые 50 000 ₽ на фрилансе",
      description: "Пошаговая инструкция для новичков: выбор ниши, создание портфолио, поиск первых клиентов",
      date: "15 января 2026",
      views: "12 345",
      icon: "FileText"
    },
    {
      title: "Инвестиции для начинающих: с чего начать",
      description: "Разбор популярных инструментов: акции, облигации, ETF. Минимизация рисков",
      date: "10 января 2026",
      views: "8 921",
      icon: "BarChart"
    },
    {
      title: "Топ-5 ошибок начинающих инфобизнесменов",
      description: "Реальные кейсы провалов и успехов. Как не слить бюджет на старте",
      date: "5 января 2026",
      views: "15 672",
      icon: "AlertTriangle"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <section className="mb-12 text-center py-12 md:py-20 animate-fade-in">
          <div className="mb-8 inline-block">
            <div className="w-16 h-16 md:w-20 md:h-20 gradient-bg animate-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 hover-lift">
              <Icon name="Rocket" className="text-white" size={40} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text leading-tight">
            Заработок в интернете
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Проверенные методы, реальные цифры и актуальные кейсы. Начни зарабатывать онлайн уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/articles")}
              className="gradient-bg animate-gradient text-white hover:scale-105 transition-transform text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              <Icon name="ArrowRight" className="mr-2" size={20} />
              Начать сейчас
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl hover-lift">
              Смотреть методы
            </Button>
          </div>

          <AdBlock blockId="top" className="mt-12" />
        </section>

        <section id="methods" className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-4 py-2">Сравнение методов</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Популярные способы заработка
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выбери подходящий метод на основе реальных данных
            </p>
          </div>

          <div className="overflow-x-auto mb-12">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border rounded-2xl shadow-lg">
                <table className="min-w-full divide-y divide-border">
                  <thead className="gradient-bg animate-gradient">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Метод
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Доход/месяц
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Вложения
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Сложность
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Срок до дохода
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {methods.map((method, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`${method.color} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                              <Icon name={method.icon} className="text-white" size={20} />
                            </div>
                            <span className="font-semibold text-base">{method.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-primary">
                          {method.income}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base">
                          {method.investment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary" className="text-sm">
                            {method.difficulty}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-muted-foreground">
                          {method.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <AdBlock blockId="middle" />
        </section>

        <section id="articles" className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-4 py-2">Актуальные материалы</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Свежие статьи и кейсы
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Практические советы и реальный опыт
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover-lift cursor-pointer border-2 overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 gradient-bg animate-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={article.icon} className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Eye" size={16} />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <AdBlock blockId="bottom" className="mb-12" />

        <footer className="text-center py-12 border-t">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 gradient-bg animate-gradient rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="text-white" size={16} />
            </div>
            <span className="font-bold text-xl gradient-text">Заработок в интернете</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Проверенные методы онлайн-заработка
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">О проекте</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <span>•</span>
            <button onClick={() => navigate("/admin")} className="hover:text-primary transition-colors">Админ</button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2026 Все права защищены
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;