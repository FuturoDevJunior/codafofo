# 📊 Diagramas da Arquitetura - Vytalle Estética

> **Diagramas técnicos detalhados e fiéis ao projeto atual**

## 📋 Índice

- [Arquitetura Geral](#arquitetura-geral)
- [Fluxo de Dados](#fluxo-de-dados)
- [Estrutura de Componentes](#estrutura-de-componentes)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Fluxo de Checkout](#fluxo-de-checkout)
- [Estrutura do Banco](#estrutura-do-banco)
- [Fluxo de Testes](#fluxo-de-testes)
- [Deploy e CI/CD](#deploy-e-cicd)

---

## 🏗️ Arquitetura Geral

### Visão de Alto Nível

```mermaid
graph TB
    subgraph "Frontend (Next.js 15.4.2)"
        UI[UI Components<br/>React 18.3.1]
        Pages[Pages/Routes<br/>App Router]
        Hooks[Custom Hooks<br/>Zustand]
        PWA[PWA<br/>Service Worker]
    end

    subgraph "Backend (Supabase)"
        API[API Routes<br/>Edge Functions]
        DB[(PostgreSQL 15<br/>RLS Enabled)]
        Auth[Authentication<br/>JWT Tokens]
        Storage[File Storage<br/>Images/PDFs]
    end

    subgraph "Infrastructure"
        Vercel[Vercel<br/>Edge Network]
        CDN[CDN<br/>Global Distribution]
        Analytics[Analytics<br/>User Tracking]
    end

    subgraph "External Services"
        WhatsApp[WhatsApp Business<br/>Checkout Integration]
        PDF[PDF Generation<br/>Order Documents]
    end

    UI --> Pages
    Pages --> Hooks
    Hooks --> API
    API --> DB
    API --> Auth
    API --> Storage
    API --> WhatsApp
    API --> PDF

    Vercel --> CDN
    CDN --> Analytics

    PWA --> Storage
    PWA --> Analytics
```

### Stack Tecnológica Detalhada

```mermaid
graph LR
    subgraph "Frontend Stack"
        NextJS[Next.js 15.4.2]
        React[React 18.3.1]
        TS[TypeScript 5]
        Tailwind[Tailwind CSS 3.4]
        Radix[Radix UI]
        Framer[Framer Motion]
        Zustand[Zustand 4.5.2]
    end

    subgraph "Backend Stack"
        Supabase[Supabase]
        PostgreSQL[PostgreSQL 15]
        EdgeFunc[Edge Functions]
        RLS[Row Level Security]
    end

    subgraph "DevOps Stack"
        Vercel[Vercel]
        GitHub[GitHub Actions]
        Vitest[Vitest]
        Playwright[Playwright]
        Husky[Husky]
    end

    NextJS --> React
    React --> TS
    TS --> Tailwind
    Tailwind --> Radix
    Radix --> Framer
    Framer --> Zustand

    Supabase --> PostgreSQL
    PostgreSQL --> RLS
    RLS --> EdgeFunc

    Vercel --> GitHub
    GitHub --> Vitest
    Vitest --> Playwright
    Playwright --> Husky
```

---

## 🔄 Fluxo de Dados

### Fluxo Principal da Aplicação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Frontend
    participant API as API Routes
    participant DB as Supabase
    participant WA as WhatsApp
    participant PDF as PDF Gen

    U->>UI: Acessa catálogo
    UI->>API: GET /api/products
    API->>DB: SELECT products
    DB-->>API: Lista de produtos
    API-->>UI: JSON response
    UI-->>U: Renderiza produtos

    U->>UI: Adiciona ao carrinho
    UI->>UI: Zustand store update
    UI-->>U: Carrinho atualizado

    U->>UI: Finaliza compra
    UI->>API: POST /api/checkout
    API->>DB: INSERT order
    API->>PDF: Gera PDF do pedido
    API->>WA: Envia mensagem WhatsApp
    DB-->>API: Order ID
    PDF-->>API: PDF URL
    WA-->>API: Confirmação
    API-->>UI: Order details
    UI-->>U: Sucesso + redirecionamento
```

### Fluxo de Estado (Zustand)

```mermaid
graph TD
    subgraph "Cart Store (Zustand)"
        CartState[Cart State]
        AddItem[addItem]
        RemoveItem[removeItem]
        UpdateQty[updateQuantity]
        ClearCart[clearCart]
    end

    subgraph "Persistence Layer"
        IDB[IndexedDB]
        LocalStorage[Local Storage]
    end

    subgraph "UI Components"
        ProductCard[ProductCard]
        CartSidebar[CartSidebar]
        Checkout[Checkout]
    end

    ProductCard --> AddItem
    CartSidebar --> RemoveItem
    CartSidebar --> UpdateQty
    Checkout --> ClearCart

    AddItem --> CartState
    RemoveItem --> CartState
    UpdateQty --> CartState
    ClearCart --> CartState

    CartState --> IDB
    CartState --> LocalStorage

    CartState --> ProductCard
    CartState --> CartSidebar
    CartState --> Checkout
```

---

## 🧩 Estrutura de Componentes

### Hierarquia de Componentes

```mermaid
graph TD
    subgraph "Root Layout"
        RootLayout[RootLayout]
        Header[Header]
        CartSidebar[CartSidebar]
        Toaster[Toaster]
    end

    subgraph "Providers"
        AccessibilityProvider[AccessibilityProvider]
        AnalyticsProvider[AnalyticsProvider]
        CustomizationProvider[CustomizationProvider]
    end

    subgraph "Pages"
        HomePage[HomePage]
        ProductsPage[ProductsPage]
        ProductDetail[ProductDetail]
        CartPage[CartPage]
        CheckoutPage[CheckoutPage]
        AdminPage[AdminPage]
    end

    subgraph "UI Components"
        ProductCard[ProductCard]
        ProductCatalog[ProductCatalog]
        CartItem[CartItem]
        SmartImage[SmartImage]
        LoadingButton[LoadingButton]
    end

    subgraph "Admin Components"
        AdminDashboard[AdminDashboard]
        AdminForm[AdminForm]
        AdminFormComplete[AdminFormComplete]
        ImageUploader[ImageUploader]
    end

    RootLayout --> Header
    RootLayout --> CartSidebar
    RootLayout --> Toaster

    RootLayout --> AccessibilityProvider
    RootLayout --> AnalyticsProvider
    RootLayout --> CustomizationProvider

    HomePage --> ProductCatalog
    ProductsPage --> ProductCatalog
    ProductDetail --> ProductCard
    CartPage --> CartItem
    CheckoutPage --> LoadingButton

    ProductCatalog --> ProductCard
    CartSidebar --> CartItem

    AdminPage --> AdminDashboard
    AdminDashboard --> AdminForm
    AdminDashboard --> AdminFormComplete
    AdminForm --> ImageUploader
```

### Fluxo de Props e Estado

```mermaid
graph LR
    subgraph "Data Flow"
        API[API Data]
        Store[Zustand Store]
        Props[Component Props]
        State[Local State]
    end

    subgraph "Components"
        Parent[Parent Component]
        Child[Child Component]
        GrandChild[Grand Child]
    end

    API --> Store
    Store --> Props
    Props --> Parent
    Parent --> Child
    Child --> GrandChild

    Parent --> State
    Child --> State
    GrandChild --> State

    State --> Props
    Props --> Child
    Props --> GrandChild
```

---

## 🔐 Fluxo de Autenticação

### Autenticação Admin

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Admin Login
    participant API as Auth API
    participant Supabase as Supabase Auth
    participant DB as Database

    U->>UI: Acessa /admin/login
    UI-->>U: Formulário de login

    U->>UI: Insere credenciais
    UI->>API: POST /api/auth/login
    API->>Supabase: signInWithPassword
    Supabase->>DB: Verifica credenciais
    DB-->>Supabase: User data
    Supabase-->>API: JWT token
    API-->>UI: Auth success
    UI-->>U: Redireciona para /admin

    Note over U,DB: Sessão autenticada
    U->>UI: Acessa área admin
    UI->>API: GET /api/admin/data
    API->>Supabase: Verifica JWT
    Supabase-->>API: Token válido
    API->>DB: SELECT com RLS
    DB-->>API: Dados protegidos
    API-->>UI: Admin data
    UI-->>U: Dashboard admin
```

### Row Level Security (RLS)

```mermaid
graph TD
    subgraph "Database Tables"
        Products[Products Table]
        Orders[Orders Table]
        Users[Users Table]
    end

    subgraph "RLS Policies"
        PublicRead[Public Read<br/>Products.active = true]
        AuthInsert[Auth Insert<br/>auth.role() = 'authenticated']
        AuthUpdate[Auth Update<br/>auth.role() = 'authenticated']
        AuthDelete[Auth Delete<br/>auth.role() = 'authenticated']
        AdminOnly[Admin Only<br/>auth.jwt() ->> 'role' = 'admin']
    end

    subgraph "Access Control"
        Anonymous[Anonymous Users]
        Authenticated[Authenticated Users]
        Admin[Admin Users]
    end

    Anonymous --> PublicRead
    PublicRead --> Products

    Authenticated --> AuthInsert
    Authenticated --> AuthUpdate
    AuthInsert --> Orders
    AuthUpdate --> Products

    Admin --> AdminOnly
    AdminOnly --> Users
    AdminOnly --> Orders
```

---

## 🛒 Fluxo de Checkout

### Processo Completo de Compra

```mermaid
graph TD
    subgraph "Início"
        A[Usuário no catálogo]
        B[Adiciona produtos]
        C[Acessa carrinho]
    end

    subgraph "Checkout"
        D[Revisa itens]
        E[Insere dados]
        F[Confirma pedido]
    end

    subgraph "Processamento"
        G[Valida dados]
        H[Calcula total]
        I[Gera PDF]
        J[Salva no banco]
    end

    subgraph "Integração"
        K[Envia WhatsApp]
        L[Confirma envio]
        M[Redireciona]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> M

    style A fill:#e1f5fe
    style M fill:#c8e6c9
    style G fill:#fff3e0
    style K fill:#f3e5f5
```

### Estrutura da Mensagem WhatsApp

```mermaid
graph TD
    subgraph "Mensagem WhatsApp"
        Header[Header<br/>*PEDIDO VYTALE*]
        CustomerInfo[Customer Info<br/>Nome, CEP, Contato]
        ProductsList[Products List<br/>Item, Qty, Price]
        Summary[Summary<br/>Subtotals, Total]
        NextSteps[Next Steps<br/>Confirmação, Frete, Pagamento]
        Footer[Footer<br/>Assinatura da empresa]
    end

    subgraph "Formatação"
        Bold[Bold Text<br/>**texto**]
        Italic[Italic Text<br/>_texto_]
        LineBreak[Line Break<br/>\n]
        Emoji[Emojis<br/>📦 💉 🏥]
    end

    Header --> CustomerInfo
    CustomerInfo --> ProductsList
    ProductsList --> Summary
    Summary --> NextSteps
    NextSteps --> Footer

    Bold --> Header
    Bold --> Summary
    Italic --> Footer
    LineBreak --> CustomerInfo
    LineBreak --> ProductsList
    Emoji --> Header
    Emoji --> NextSteps
```

---

## 🗄️ Estrutura do Banco

### Schema do Banco de Dados

```mermaid
erDiagram
    PRODUCTS {
        uuid id PK
        text name
        text slug UK
        decimal price_pix
        decimal price_prazo
        text description
        text[] images
        text category
        boolean active
        timestamp created_at
    }

    ORDERS {
        uuid id PK
        text customer_name
        text customer_phone
        jsonb items
        decimal total
        text pdf_url
        timestamp created_at
    }

    USERS {
        uuid id PK
        text email
        text role
        timestamp created_at
    }

    AUDIT_LOGS {
        uuid id PK
        text action
        text table_name
        jsonb old_data
        jsonb new_data
        uuid user_id FK
        timestamp created_at
    }

    PRODUCTS ||--o{ ORDERS : "contains"
    USERS ||--o{ AUDIT_LOGS : "performs"
    ORDERS ||--o{ AUDIT_LOGS : "tracked"
```

### Relacionamentos e Constraints

```mermaid
graph TD
    subgraph "Primary Keys"
        PK1[Products.id<br/>UUID PRIMARY KEY]
        PK2[Orders.id<br/>UUID PRIMARY KEY]
        PK3[Users.id<br/>UUID PRIMARY KEY]
    end

    subgraph "Foreign Keys"
        FK1[AuditLogs.user_id<br/>REFERENCES Users.id]
        FK2[AuditLogs.order_id<br/>REFERENCES Orders.id]
    end

    subgraph "Unique Constraints"
        UK1[Products.slug<br/>UNIQUE NOT NULL]
        UK2[Users.email<br/>UNIQUE NOT NULL]
    end

    subgraph "Check Constraints"
        CC1[Products.category<br/>IN ('Toxina Botulínica', 'Bioestimulador', ...)]
        CC2[Products.price_pix<br/>> 0]
        CC3[Products.price_prazo<br/>> 0]
    end

    subgraph "Default Values"
        DV1[Products.active<br/>DEFAULT TRUE]
        DV2[Products.created_at<br/>DEFAULT NOW()]
        DV3[Orders.created_at<br/>DEFAULT NOW()]
    end

    PK1 --> FK1
    PK2 --> FK2
    PK3 --> FK1

    UK1 --> CC1
    UK2 --> CC2
    CC3 --> DV1
    DV2 --> DV3
```

---

## 🧪 Fluxo de Testes

### Estrutura de Testes

```mermaid
graph TD
    subgraph "Test Types"
        Unit[Unit Tests<br/>Vitest]
        Integration[Integration Tests<br/>Vitest + RTL]
        E2E[E2E Tests<br/>Playwright]
        Visual[Visual Tests<br/>Playwright]
    end

    subgraph "Test Coverage"
        Components[Components<br/>95%+]
        Hooks[Hooks<br/>90%+]
        Utils[Utils<br/>85%+]
        API[API Routes<br/>80%+]
    end

    subgraph "Test Categories"
        Rendering[Rendering Tests]
        Interactions[Interaction Tests]
        State[State Management Tests]
        API[API Integration Tests]
        Accessibility[Accessibility Tests]
        Performance[Performance Tests]
    end

    Unit --> Components
    Unit --> Hooks
    Unit --> Utils

    Integration --> API
    Integration --> State

    E2E --> Interactions
    E2E --> API

    Visual --> Rendering
    Visual --> Accessibility

    Components --> Rendering
    Components --> Interactions
    Hooks --> State
    Utils --> Performance
    API --> API
```

### Pipeline de Testes

```mermaid
graph LR
    subgraph "Pre-commit (Husky)"
        Lint[ESLint]
        TypeCheck[TypeScript Check]
        UnitTests[Unit Tests]
        Format[Prettier]
    end

    subgraph "CI/CD (GitHub Actions)"
        Install[Install Dependencies]
        Build[Build Project]
        TestAll[Run All Tests]
        Coverage[Generate Coverage]
        E2E[E2E Tests]
        Deploy[Deploy to Vercel]
    end

    subgraph "Quality Gates"
        CoverageGate[Coverage > 60%]
        TestGate[All Tests Pass]
        BuildGate[Build Success]
        SecurityGate[Security Scan]
    end

    Lint --> TypeCheck
    TypeCheck --> UnitTests
    UnitTests --> Format

    Install --> Build
    Build --> TestAll
    TestAll --> Coverage
    Coverage --> E2E
    E2E --> Deploy

    Coverage --> CoverageGate
    TestAll --> TestGate
    Build --> BuildGate
    Deploy --> SecurityGate
```

---

## 🚀 Deploy e CI/CD

### Pipeline de Deploy

```mermaid
graph TD
    subgraph "Development"
        Dev[Local Development]
        Commit[Git Commit]
        Push[Push to GitHub]
    end

    subgraph "GitHub Actions"
        Trigger[Workflow Trigger]
        Install[Install Dependencies]
        Lint[Lint Code]
        Test[Run Tests]
        Build[Build Project]
        Deploy[Deploy to Vercel]
    end

    subgraph "Vercel"
        Preview[Preview Deployment]
        Production[Production Deployment]
        CDN[CDN Distribution]
        Analytics[Analytics]
    end

    subgraph "Monitoring"
        Health[Health Checks]
        Performance[Performance Monitoring]
        Errors[Error Tracking]
        Uptime[Uptime Monitoring]
    end

    Dev --> Commit
    Commit --> Push
    Push --> Trigger

    Trigger --> Install
    Install --> Lint
    Lint --> Test
    Test --> Build
    Build --> Deploy

    Deploy --> Preview
    Preview --> Production
    Production --> CDN
    CDN --> Analytics

    Production --> Health
    Production --> Performance
    Production --> Errors
    Production --> Uptime
```

### Estrutura de Ambientes

```mermaid
graph TD
    subgraph "Environments"
        Local[Local Development<br/>localhost:5174]
        Preview[Preview<br/>vercel.app/preview]
        Staging[Staging<br/>staging.vytalle.com]
        Production[Production<br/>vytalle-estetica.vercel.app]
    end

    subgraph "Database"
        LocalDB[Local Supabase<br/>Development]
        StagingDB[Staging Supabase<br/>Testing]
        ProdDB[Production Supabase<br/>Live Data]
    end

    subgraph "Services"
        LocalAPI[Local API<br/>Edge Functions]
        StagingAPI[Staging API<br/>Edge Functions]
        ProdAPI[Production API<br/>Edge Functions]
    end

    Local --> LocalDB
    Local --> LocalAPI

    Preview --> StagingDB
    Preview --> StagingAPI

    Staging --> StagingDB
    Staging --> StagingAPI

    Production --> ProdDB
    Production --> ProdAPI

    LocalDB --> StagingDB
    StagingDB --> ProdDB
```

---

## 📊 Métricas e Monitoramento

### Dashboard de Performance

```mermaid
graph TD
    subgraph "Core Web Vitals"
        LCP[LCP<br/>Largest Contentful Paint<br/>Target: < 2.5s]
        FID[FID<br/>First Input Delay<br/>Target: < 100ms]
        CLS[CLS<br/>Cumulative Layout Shift<br/>Target: < 0.1]
    end

    subgraph "Performance Metrics"
        TTFB[TTFB<br/>Time to First Byte<br/>Target: < 600ms]
        BundleSize[Bundle Size<br/>Target: < 350kB]
        LoadTime[Load Time<br/>Target: < 3s]
    end

    subgraph "Business Metrics"
        Conversion[Conversion Rate<br/>Checkout Completion]
        Engagement[User Engagement<br/>Time on Site]
        Retention[User Retention<br/>Return Visits]
    end

    subgraph "Technical Metrics"
        Uptime[Uptime<br/>Target: 99.9%]
        ErrorRate[Error Rate<br/>Target: < 0.1%]
        ResponseTime[API Response Time<br/>Target: < 200ms]
    end

    LCP --> TTFB
    FID --> ResponseTime
    CLS --> BundleSize

    TTFB --> LoadTime
    BundleSize --> LoadTime

    LoadTime --> Conversion
    ResponseTime --> Engagement
    Uptime --> Retention

    Conversion --> ErrorRate
    Engagement --> ErrorRate
    Retention --> ErrorRate
```

---

## 🔧 Configuração e Setup

### Variáveis de Ambiente

```mermaid
graph TD
    subgraph "Required Environment Variables"
        SupabaseURL[NEXT_PUBLIC_SUPABASE_URL]
        SupabaseKey[NEXT_PUBLIC_SUPABASE_ANON_KEY]
        ServiceKey[SUPABASE_SERVICE_ROLE_KEY]
        DBPassword[SUPABASE_DB_PASSWORD]
        AdminUser[ADMIN_USERNAME]
        AdminPass[ADMIN_PASSWORD]
    end

    subgraph "Optional Environment Variables"
        VercelToken[VERCEL_TOKEN]
        VercelOrg[VERCEL_ORG_ID]
        VercelProject[VERCEL_PROJECT_ID]
        SiteURL[NEXT_PUBLIC_SITE_URL]
    end

    subgraph "Development"
        DevPort[PORT<br/>Default: 5174]
        DevHost[HOST<br/>Default: localhost]
    end

    subgraph "Production"
        ProdURL[Production URL]
        ProdCDN[CDN Configuration]
        ProdSSL[SSL Certificate]
    end

    SupabaseURL --> SupabaseKey
    SupabaseKey --> ServiceKey
    ServiceKey --> DBPassword
    DBPassword --> AdminUser
    AdminUser --> AdminPass

    VercelToken --> VercelOrg
    VercelOrg --> VercelProject
    VercelProject --> SiteURL

    DevPort --> DevHost
    DevHost --> ProdURL
    ProdURL --> ProdCDN
    ProdCDN --> ProdSSL
```

---

## 📱 PWA e Mobile

### Estrutura PWA

```mermaid
graph TD
    subgraph "PWA Components"
        Manifest[Web App Manifest<br/>manifest.json]
        ServiceWorker[Service Worker<br/>sw.js]
        Icons[App Icons<br/>192x192, 512x512]
        Splash[Splash Screen<br/>Loading Screen]
    end

    subgraph "PWA Features"
        Offline[Offline Support<br/>Cache Strategy]
        Install[Install Prompt<br/>Add to Home Screen]
        Push[Push Notifications<br/>Future Feature]
        Background[Background Sync<br/>Future Feature]
    end

    subgraph "Mobile Optimization"
        Responsive[Responsive Design<br/>Mobile First]
        Touch[Touch Interactions<br/>Gesture Support]
        Performance[Mobile Performance<br/>Optimized Loading]
        Accessibility[Mobile Accessibility<br/>Screen Readers]
    end

    Manifest --> Install
    ServiceWorker --> Offline
    Icons --> Install
    Splash --> Install

    Offline --> Performance
    Install --> Touch
    Push --> Background

    Responsive --> Touch
    Touch --> Performance
    Performance --> Accessibility
```

---

## 🔒 Segurança e Compliance

### Camadas de Segurança

```mermaid
graph TD
    subgraph "Frontend Security"
        CSP[Content Security Policy<br/>CSP Headers]
        HTTPS[HTTPS Only<br/>SSL/TLS]
        XSS[XSS Protection<br/>Input Sanitization]
        CSRF[CSRF Protection<br/>Token Validation]
    end

    subgraph "Backend Security"
        RLS[Row Level Security<br/>Database Policies]
        Auth[JWT Authentication<br/>Token Management]
        RateLimit[Rate Limiting<br/>Request Throttling]
        Validation[Input Validation<br/>Data Sanitization]
    end

    subgraph "Infrastructure Security"
        Headers[Security Headers<br/>HSTS, X-Frame-Options]
        WAF[Web Application Firewall<br/>DDoS Protection]
        Monitoring[Security Monitoring<br/>Threat Detection]
        Backup[Data Backup<br/>Disaster Recovery]
    end

    subgraph "Compliance"
        LGPD[LGPD Compliance<br/>Data Protection]
        GDPR[GDPR Ready<br/>Privacy Controls]
        Audit[Audit Logging<br/>Activity Tracking]
        Encryption[Data Encryption<br/>At Rest & In Transit]
    end

    CSP --> HTTPS
    HTTPS --> XSS
    XSS --> CSRF

    RLS --> Auth
    Auth --> RateLimit
    RateLimit --> Validation

    Headers --> WAF
    WAF --> Monitoring
    Monitoring --> Backup

    LGPD --> GDPR
    GDPR --> Audit
    Audit --> Encryption
```

---

## 📈 Escalabilidade

### Arquitetura Escalável

```mermaid
graph TD
    subgraph "Current Architecture"
        SingleApp[Single Next.js App]
        SingleDB[Single Supabase Instance]
        SingleCDN[Vercel CDN]
    end

    subgraph "Scalability Path"
        Microservices[Microservices<br/>API Separation]
        Sharding[Database Sharding<br/>Horizontal Partitioning]
        LoadBalancer[Load Balancer<br/>Traffic Distribution]
        Caching[Redis Caching<br/>Session & Data]
    end

    subgraph "Future Scaling"
        MultiRegion[Multi-Region Deployment<br/>Global Distribution]
        AutoScaling[Auto Scaling<br/>Dynamic Resources]
        EventDriven[Event-Driven Architecture<br/>Message Queues]
        Containerization[Container Orchestration<br/>Kubernetes]
    end

    SingleApp --> Microservices
    SingleDB --> Sharding
    SingleCDN --> LoadBalancer

    Microservices --> Caching
    Sharding --> MultiRegion
    LoadBalancer --> AutoScaling

    Caching --> EventDriven
    MultiRegion --> Containerization
    AutoScaling --> Containerization
```

---

## 🎯 Conclusão

Estes diagramas representam fielmente a arquitetura atual do projeto Vytalle Estética, incluindo:

- **Arquitetura em camadas** com separação clara de responsabilidades
- **Fluxos de dados** detalhados entre componentes
- **Estrutura de banco** com relacionamentos e constraints
- **Pipeline de CI/CD** completo
- **Medidas de segurança** em múltiplas camadas
- **Estratégias de escalabilidade** para crescimento futuro

Todos os diagramas são baseados no código real do projeto e refletem as decisões arquiteturais implementadas.
