import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AIModel {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'processing' | 'completed';
  response?: string;
  score?: number;
}

export default function Index() {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bestResult, setBestResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState('home');

  const aiModels: AIModel[] = [
    {
      id: '1',
      name: 'ChatGPT Free',
      description: 'Универсальная языковая модель от OpenAI',
      category: 'Текст',
      status: 'active',
      response: '',
      score: 0
    },
    {
      id: '2',
      name: 'Claude Free',
      description: 'Аналитическая модель Anthropic',
      category: 'Текст',
      status: 'active',
      response: '',
      score: 0
    },
    {
      id: '3',
      name: 'Gemini Free',
      description: 'Мультимодальная модель Google',
      category: 'Текст',
      status: 'active',
      response: '',
      score: 0
    },
    {
      id: '4',
      name: 'Mistral Free',
      description: 'Открытая европейская модель',
      category: 'Текст',
      status: 'active',
      response: '',
      score: 0
    },
    {
      id: '5',
      name: 'DeepSeek',
      description: 'Модель для программирования',
      category: 'Код',
      status: 'active',
      response: '',
      score: 0
    },
    {
      id: '6',
      name: 'Llama 3.1',
      description: 'Открытая модель Meta',
      category: 'Текст',
      status: 'active',
      response: '',
      score: 0
    }
  ];

  const [models, setModels] = useState<AIModel[]>(aiModels);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setBestResult('');

    const updatedModels = models.map(model => ({
      ...model,
      status: 'processing' as const,
      response: '',
      score: 0
    }));
    setModels(updatedModels);

    setTimeout(() => {
      const simulatedResponses = models.map((model, index) => ({
        ...model,
        status: 'completed' as const,
        response: `Ответ от ${model.name}: ${prompt.substring(0, 50)}... [Симуляция ответа №${index + 1}]`,
        score: Math.floor(Math.random() * 30) + 70
      }));

      const sortedByScore = [...simulatedResponses].sort((a, b) => (b.score || 0) - (a.score || 0));
      const best = sortedByScore[0];

      setModels(simulatedResponses);
      setBestResult(best.response || '');
      setIsProcessing(false);
      setActiveTab('results');
    }, 3000);
  };

  const faqItems = [
    {
      question: 'Как работает выбор лучшего ответа?',
      answer: 'Специальная нейросеть-арбитр анализирует все полученные ответы по критериям: точность, полнота, релевантность и стиль изложения. Затем выбирается наиболее качественный результат.'
    },
    {
      question: 'Какие нейросети доступны бесплатно?',
      answer: 'В нашем каталоге собраны бесплатные версии ChatGPT, Claude, Gemini, Mistral, DeepSeek, Llama и другие open-source модели.'
    },
    {
      question: 'Можно ли сравнить ответы вручную?',
      answer: 'Да! Во вкладке "Сравнение результатов" вы можете увидеть все ответы от разных моделей и выбрать наиболее подходящий самостоятельно.'
    },
    {
      question: 'Сколько времени занимает обработка?',
      answer: 'В среднем 2-5 секунд на получение ответов от всех моделей и выбор лучшего результата.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-ai flex items-center justify-center glow-purple">
                <Icon name="Brain" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Агрегатор
                </h1>
                <p className="text-xs text-muted-foreground">Лучшие ответы от всех нейросетей</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveTab('home')} 
                className="text-sm hover:text-primary transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveTab('catalog')} 
                className="text-sm hover:text-primary transition-colors"
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveTab('about')} 
                className="text-sm hover:text-primary transition-colors"
              >
                О проекте
              </button>
              <button 
                onClick={() => setActiveTab('faq')} 
                className="text-sm hover:text-primary transition-colors"
              >
                FAQ
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden">
            <TabsTrigger value="home">Главная</TabsTrigger>
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="results">Результаты</TabsTrigger>
            <TabsTrigger value="about">О проекте</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-12 animate-fade-in">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 animate-pulse-glow">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">Бесплатный доступ к 6+ нейросетям</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Один промпт —{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  лучший результат
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Отправьте запрос сразу всем популярным нейросетям. ИИ-арбитр автоматически выберет наиболее качественный ответ.
              </p>

              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
                <div className="gradient-border glow-purple">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Введите ваш промпт здесь... Например: 'Напиши план маркетинговой стратегии для стартапа'"
                    className="min-h-[120px] bg-card border-0 text-base resize-none"
                    disabled={isProcessing}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="gradient-ai text-white font-semibold px-8 glow-cyan hover:scale-105 transition-transform"
                  disabled={isProcessing || !prompt.trim()}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2" size={20} />
                      Получить лучший ответ
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:glow-purple">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Мгновенный результат</CardTitle>
                  <CardDescription>
                    Получите ответы от всех моделей за 2-5 секунд
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-secondary/20 hover:border-secondary/40 transition-all hover:glow-cyan">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-2">
                    <Icon name="Target" size={24} className="text-secondary" />
                  </div>
                  <CardTitle>ИИ-арбитр</CardTitle>
                  <CardDescription>
                    Нейросеть выбирает лучший ответ по качеству и точности
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:glow-purple">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon name="Gift" size={24} className="text-primary" />
                  </div>
                  <CardTitle>100% бесплатно</CardTitle>
                  <CardDescription>
                    Доступ ко всем моделям без подписок и ограничений
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="animate-fade-in">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Каталог нейросетей</h2>
                <p className="text-muted-foreground text-lg">
                  Все модели работают параллельно для максимальной скорости
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                  <Card key={model.id} className="border-border/50 hover:border-primary/40 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {model.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {model.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          model.status === 'completed' ? 'bg-green-500' :
                          model.status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                          'bg-blue-500'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {model.status === 'active' ? 'Готов' :
                           model.status === 'processing' ? 'Обработка' :
                           'Завершено'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-fade-in">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Результаты обработки</h2>
                <p className="text-muted-foreground">
                  ИИ-арбитр проанализировал все ответы и выбрал лучший
                </p>
              </div>

              {bestResult && (
                <Card className="border-primary/40 glow-purple">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon name="Trophy" size={24} className="text-primary" />
                      <CardTitle>Лучший результат</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{bestResult}</p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="List" size={20} />
                  Все результаты
                </h3>
                <div className="grid gap-4">
                  {models
                    .filter(m => m.response)
                    .sort((a, b) => (b.score || 0) - (a.score || 0))
                    .map((model) => (
                      <Card key={model.id} className="border-border/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{model.name}</CardTitle>
                            <Badge variant="outline" className="font-mono">
                              Оценка: {model.score}/100
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{model.response}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">О проекте</h2>
                <p className="text-xl text-muted-foreground">
                  Агрегатор бесплатных нейросетей с умным выбором результата
                </p>
              </div>

              <Card className="border-border/50">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Icon name="Lightbulb" size={20} className="text-primary" />
                      Наша миссия
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Мы создали платформу, которая объединяет лучшие бесплатные нейросети в одном месте. 
                      Вместо того чтобы переключаться между десятками сервисов, вы получаете доступ ко всем 
                      моделям одновременно и автоматически получаете наилучший результат.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Icon name="Cog" size={20} className="text-secondary" />
                      Как это работает
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Ваш промпт отправляется параллельно во все доступные нейросети</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Специальная модель-арбитр анализирует качество каждого ответа</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Лучший результат выбирается автоматически и отображается первым</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Icon name="Users" size={20} className="text-primary" />
                      Для кого
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Для всех, кто хочет получить максимум от ИИ-технологий: разработчиков, контент-мейкеров, 
                      студентов, исследователей и просто любознательных людей.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Вопросы и ответы</h2>
                <p className="text-muted-foreground">
                  Ответы на часто задаваемые вопросы
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border/50 rounded-lg px-6 hover:border-primary/40 transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={20} />
                    Остались вопросы?
                  </CardTitle>
                  <CardDescription>
                    Свяжитесь с нами через форму обратной связи
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Ваше имя" className="bg-background" />
                  <Input type="email" placeholder="Email" className="bg-background" />
                  <Textarea placeholder="Ваш вопрос" className="bg-background min-h-[100px]" />
                  <Button className="gradient-ai text-white">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="relative border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Агрегатор. Все права защищены.
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Политика конфиденциальности
              </button>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Условия использования
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
