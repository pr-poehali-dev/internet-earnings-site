import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adBlocks, setAdBlocks] = useState({
    top: "",
    middle: "",
    bottom: ""
  });

  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadAdBlocks();
    }
  }, []);

  const loadAdBlocks = () => {
    const saved = localStorage.getItem("adBlocks");
    if (saved) {
      setAdBlocks(JSON.parse(saved));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      loadAdBlocks();
      toast.success("Вход выполнен успешно!");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setPassword("");
    toast.success("Вы вышли из системы");
  };

  const handleSave = () => {
    localStorage.setItem("adBlocks", JSON.stringify(adBlocks));
    toast.success("Рекламные блоки сохранены!");
  };

  const handleAdBlockChange = (blockId: string, value: string) => {
    setAdBlocks({
      ...adBlocks,
      [blockId]: value
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <div className="w-16 h-16 gradient-bg animate-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl">Панель администратора</CardTitle>
            <CardDescription>Введите пароль для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="gradient-bg animate-gradient text-white flex-1">
                  <Icon name="LogIn" className="mr-2" size={18} />
                  Войти
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Отмена
                </Button>
              </div>
            </form>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                💡 Для демонстрации используйте пароль: <span className="font-mono font-bold">admin123</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg animate-gradient rounded-lg flex items-center justify-center">
              <Icon name="Settings" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Панель администратора</h1>
              <p className="text-sm text-muted-foreground">Управление рекламными блоками</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-yellow-500">Верхний блок</Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Отображается в верхней части страницы, под главным заголовком
                  </CardDescription>
                </div>
                <Icon name="ArrowUp" className="text-yellow-500" size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor="top">Код РСЯ</Label>
              <Textarea
                id="top"
                value={adBlocks.top}
                onChange={(e) => handleAdBlockChange("top", e.target.value)}
                placeholder='<!-- Yandex.RTB R-A-XXXXXX-X -->
<div id="yandex_rtb_R-A-XXXXXX-X"></div>
<script>
  window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
      "blockId": "R-A-XXXXXX-X",
      "renderTo": "yandex_rtb_R-A-XXXXXX-X"
    })
  })
</script>'
                rows={8}
                className="mt-2 font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-orange-500">Средний блок</Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Отображается в середине страницы, между таблицей методов и статьями
                  </CardDescription>
                </div>
                <Icon name="Minus" className="text-orange-500" size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor="middle">Код РСЯ</Label>
              <Textarea
                id="middle"
                value={adBlocks.middle}
                onChange={(e) => handleAdBlockChange("middle", e.target.value)}
                placeholder='<!-- Yandex.RTB R-A-XXXXXX-X -->
<div id="yandex_rtb_R-A-XXXXXX-X"></div>
<script>
  window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
      "blockId": "R-A-XXXXXX-X",
      "renderTo": "yandex_rtb_R-A-XXXXXX-X"
    })
  })
</script>'
                rows={8}
                className="mt-2 font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-purple-500">Нижний блок</Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Отображается внизу страницы, перед футером
                  </CardDescription>
                </div>
                <Icon name="ArrowDown" className="text-purple-500" size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor="bottom">Код РСЯ</Label>
              <Textarea
                id="bottom"
                value={adBlocks.bottom}
                onChange={(e) => handleAdBlockChange("bottom", e.target.value)}
                placeholder='<!-- Yandex.RTB R-A-XXXXXX-X -->
<div id="yandex_rtb_R-A-XXXXXX-X"></div>
<script>
  window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
      "blockId": "R-A-XXXXXX-X",
      "renderTo": "yandex_rtb_R-A-XXXXXX-X"
    })
  })
</script>'
                rows={8}
                className="mt-2 font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            onClick={handleSave}
            size="lg"
            className="gradient-bg animate-gradient text-white"
          >
            <Icon name="Save" className="mr-2" size={20} />
            Сохранить все изменения
          </Button>
        </div>

        <Card className="mt-8 border-2 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              Инструкция
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>1.</strong> Получите код блока в кабинете Яндекс.Директ (РСЯ)</p>
            <p><strong>2.</strong> Вставьте полный HTML-код блока в соответствующее поле</p>
            <p><strong>3.</strong> Нажмите "Сохранить все изменения"</p>
            <p><strong>4.</strong> Блоки автоматически появятся на главной странице и странице статей</p>
            <p className="text-muted-foreground pt-2 border-t">
              💡 Если оставить поле пустым, будет показан плейсхолдер "📢 Реклама"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
