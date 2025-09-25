# Развертывание Customer Portal

## Автоматический деплой на AWS S3

### Быстрая настройка

```bash
# Сделайте скрипт исполняемым
chmod +x setup-deploy.sh

# Запустите настройку
./setup-deploy.sh
```

### Ручная настройка

#### 1. Установите AWS CLI

```bash
# macOS
brew install awscli

# Windows
# Скачайте с https://aws.amazon.com/cli/

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### 2. Настройте AWS креденшиалы

```bash
aws configure
```

Введите:
- AWS Access Key ID
- AWS Secret Access Key  
- Default region: `eu-west-1`
- Default output format: `json`

#### 3. Настройте проект

Отредактируйте `deploy.sh`:

```bash
BUCKET_NAME="your-bucket-name"      # Ваш S3 bucket
S3_PATH="customer-portal"           # Путь в bucket
CLOUDFRONT_DISTRIBUTION_ID=""       # CloudFront ID (опционально)
BUILD_DIR="build"                   # Папка билда
```

#### 4. Обновите package.json

Добавьте в `scripts`:

```json
{
  "scripts": {
    "deploy": "./deploy.sh",
    "deploy:aws": "npm run build && aws s3 sync build/ s3://your-bucket/customer-portal/ --delete"
  },
  "homepage": "/customer-portal"
}
```

### Деплой

#### Первый деплой

```bash
# Сделайте скрипт исполняемым
chmod +x deploy.sh

# Запустите деплой
./deploy.sh
```

#### Последующие деплои

```bash
# Через npm script
npm run deploy

# Или напрямую
./deploy.sh
```

#### Быстрый деплой без скрипта

```bash
npm run deploy:aws
```

## Структура проекта

```
customer-portal/
├── public/                 # Статические файлы
├── src/                   # Исходный код
│   ├── components/        # React компоненты
│   │   └── Drawer.jsx     # Боковая панель навигации
│   ├── App.js            # Главный компонент
│   └── index.js          # Точка входа
├── build/                # Собранный проект (создается при билде)
├── deploy.sh            # Скрипт деплоя
├── setup-deploy.sh      # Скрипт настройки
└── package.json         # Зависимости и скрипты
```

## Особенности проекта

### Технологии

- **React 18** - UI библиотека
- **Create React App** - инструментарий
- **Tailwind CSS** - стили
- **CSS Variables** - темизация

### Компоненты

- **Drawer** - боковая панель навигации с:
  - Раскрывающимися разделами
  - Hover-панелями в свернутом режиме
  - Системой уровней отступов
  - Переменными для цветов и паддингов

### Конфигурация для деплоя

#### Create React App

Для корректной работы на поддомене нужно:

1. Установить `homepage` в package.json:
```json
"homepage": "/customer-portal"
```

2. Все ссылки будут автоматически префиксированы

#### S3 Configuration

Рекомендуемые настройки bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket/*"
    }
  ]
}
```

## Устранение проблем

### AWS CLI не найден

```bash
# Проверьте установку
aws --version

# Переустановите если нужно
brew reinstall awscli  # macOS
```

### Нет доступа к bucket

```bash
# Проверьте креденшиалы
aws sts get-caller-identity

# Проверьте права доступа к bucket
aws s3 ls s3://your-bucket-name
```

### Ошибка при билде

```bash
# Очистите кеш
npm run build -- --reset-cache

# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

### Проблемы с путями

Убедитесь, что:
1. `homepage` в package.json соответствует пути в S3
2. Все ассеты загружаются с правильными путями
3. Роутинг настроен для поддомена

## Мониторинг

### Проверка деплоя

```bash
# Проверьте файлы в S3
aws s3 ls s3://your-bucket/customer-portal/ --recursive

# Проверьте сайт
curl -I https://projects.dev.graebert.com/customer-portal/
```

### Логи CloudFront

Если используете CloudFront, проверьте логи на ошибки 404/403.

## Автоматизация

### GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: eu-west-1
    
    - name: Deploy to S3
      run: aws s3 sync build/ s3://your-bucket/customer-portal/ --delete
```

### Переменные окружения

Добавьте в GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Поддержка

При возникновении проблем:

1. Проверьте логи деплоя
2. Убедитесь в корректности AWS настроек
3. Проверьте права доступа к S3 bucket
4. Создайте issue с описанием проблемы
