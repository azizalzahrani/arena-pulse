# ArenaPulse Platform

![ArenaPulse](https://images.unsplash.com/photo-1473976345543-9ffc928e648d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

ArenaPulse is a cutting-edge real-time stadium analytics and management platform designed to optimize crowd flow, enhance fan engagement, and boost revenue across multiple venues.

## 🚀 Features

- **Real-time Analytics**: Monitor crowd density, flow patterns, and venue metrics in real-time
- **Interactive Heatmaps**: Visualize occupancy across different zones with dynamic heatmaps
- **Incident Management**: Track and respond to security incidents with automated alerts
- **Multi-venue Dashboard**: Compare performance metrics across different stadiums
- **Advanced Reporting**: Generate customizable reports with exportable data
- **Predictive Analytics**: AI-powered insights to anticipate crowd behavior
- **Responsive Design**: Full functionality across desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand for global state
- **API Layer**: TanStack Query (React Query)
- **Real-time**: Socket.IO for WebSocket connections
- **Database**: Supabase (PostgreSQL)
- **Styling**: TailwindCSS
- **Charts & Visualization**: D3.js
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/arenapulse.git
   cd arenapulse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Usage

### Authentication

The platform provides role-based access control:
- **Admin**: Full access to all features and configurations
- **Staff**: Operational access with limited configuration capabilities
- **User**: View-only access to dashboards and analytics

Default admin credentials:
- Email: admin@test.com
- Password: 123456

### Dashboard Navigation

- **Overview**: Real-time stadium metrics and key performance indicators
- **Analytics**: Detailed insights and historical data analysis
- **Events**: Schedule and manage stadium events
- **Staff**: Personnel management and assignment
- **Security**: Incident tracking and emergency response
- **Reports**: Generate and export custom reports

## 📂 Project Structure

```
arenapulse/
├── docs/                 # Documentation and specifications
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and services
│   │   ├── auth.ts       # Authentication utilities
│   │   ├── supabase.ts   # Database client
│   │   └── socket.ts     # WebSocket client
│   ├── pages/            # Page components
│   │   ├── dashboard/    # Dashboard views
│   │   └── ...           # Other pages
│   ├── stores/           # Zustand state stores
│   └── main.tsx          # Application entry point
├── supabase/
│   └── migrations/       # Database migrations
└── ...                   # Configuration files
```

## 🧪 Key Components

- **HeatMap**: Real-time visualization of crowd density
- **AnalyticsCharts**: Time-series data visualization
- **StadiumOverview**: Comprehensive venue status display
- **IncidentManager**: Security incident tracking and management
- **EventCalendar**: Event scheduling and monitoring

## 🔄 Data Flow

1. Real-time metrics are collected from stadium sensors
2. Data is processed and stored in Supabase
3. WebSocket connections push updates to client applications
4. Dashboard components visualize data and alert on thresholds
5. Users can interact with the system to manage venues and respond to incidents

## 📊 Database Schema

The platform utilizes several key tables:
- `stadiums`: Venue information and configurations
- `stadium_zones`: Segmented areas within venues
- `stadium_metrics`: Time-series performance data
- `stadium_events`: Scheduled activities
- `alerts`: System notifications and warnings
- `user_roles`: Authentication and authorization

## 🔐 Security

- JWT-based authentication
- Role-based access control
- Row-level security policies in Supabase
- Data encryption in transit and at rest

## 📝 License

[MIT License](LICENSE)

## 👥 Contributors

- Your Team Members

## 📧 Contact

For questions or support, please contact [support@arenapulse.com](mailto:support@arenapulse.com)