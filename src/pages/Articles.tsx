import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  views: string;
}

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("articles");
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      const defaultArticles: Article[] = [
        {
          id: "1",
          title: "Как заработать первые 50 000 ₽ на фрилансе",
          description: "Пошаговая инструкция для новичков: выбор ниши, создание портфолио, поиск первых клиентов",
          content: "Фриланс — один из самых доступных способов начать зарабатывать в интернете...",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
          date: "15 января 2026",
          views: "12 345"
        },
        {
          id: "2",
          title: "Инвестиции для начинающих: с чего начать",
          description: "Разбор популярных инструментов: акции, облигации, ETF. Минимизация рисков",
          content: "Инвестирование требует знаний и дисциплины. Рассмотрим основные инструменты...",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
          date: "10 января 2026",
          views: "8 921"
        },
        {
          id: "3",
          title: "Топ-5 ошибок начинающих инфобизнесменов",
          description: "Реальные кейсы провалов и успехов. Как не слить бюджет на старте",
          content: "Инфобизнес может принести миллионы, но большинство новичков допускают одни и те же ошибки...",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
          date: "5 января 2026",
          views: "15 672"
        }
      ];
      setArticles(defaultArticles);
      localStorage.setItem("articles", JSON.stringify(defaultArticles));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    const newArticle: Article = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      content: formData.content,
      image: formData.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      views: "0"
    };

    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));

    setFormData({ title: "", description: "", content: "", image: "" });
    setIsFormOpen(false);
    toast.success("Статья успешно добавлена!");
  };

  const handleDelete = (id: string) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    toast.success("Статья удалена");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/")} className="hover-lift">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            На главную
          </Button>
          <Button 
            onClick={() => setIsFormOpen(!isFormOpen)} 
            className="gradient-bg animate-gradient text-white hover:scale-105 transition-transform"
          >
            <Icon name="Plus" className="mr-2" size={20} />
            Добавить статью
          </Button>
        </div>

        <section className="mb-12 text-center py-8 animate-fade-in">
          <div className="mb-6 inline-block">
            <div className="w-16 h-16 gradient-bg animate-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 hover-lift">
              <Icon name="BookOpen" className="text-white" size={32} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            База знаний
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Все статьи о заработке в интернете в одном месте
          </p>
        </section>

        <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800 font-medium text-center">📢 Реклама</p>
        </div>

        {isFormOpen && (
          <Card className="mb-12 border-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileEdit" size={24} />
                Новая статья
              </CardTitle>
              <CardDescription>Заполните форму для добавления статьи</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Введите заголовок статьи"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Краткое описание *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Краткое описание статьи"
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Полный текст *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Полный текст статьи"
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL изображения</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Необязательно. Можно использовать ссылки с Unsplash или других источников
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="gradient-bg animate-gradient text-white flex-1">
                    <Icon name="Save" className="mr-2" size={18} />
                    Опубликовать
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsFormOpen(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mb-8 p-6 bg-orange-50 border-2 border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800 font-medium text-center">📢 Реклама</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <Card key={article.id} className="hover-lift cursor-pointer border-2 overflow-hidden group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(article.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-4 flex-1">
                <Badge className="w-fit mb-2">{article.date}</Badge>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} />
                    <span>{article.views}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Читать далее
                    <Icon name="ArrowRight" className="ml-1" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8 p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
          <p className="text-sm text-purple-800 font-medium text-center">📢 Реклама</p>
        </div>

        <footer className="text-center py-8 border-t">
          <p className="text-muted-foreground">
            Всего статей: <span className="font-bold text-primary">{articles.length}</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Articles;
