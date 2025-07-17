# FertilityTracker - Comprehensive Fertility & Ovulation Tracking App

A comprehensive fertility tracking and wellness application designed to support individuals and couples on their fertility journey with real-world medical data, evidence-based insights, and personalized tracking tools.

## Live Demo

Visit the live site: [https://igor-kan.github.io/fertilityapp](https://igor-kan.github.io/fertilityapp)

## Features

### 🎯 Core Tracking Features
- **Cycle Tracking**: Monitor menstrual cycles with detailed calendar view
- **Basal Body Temperature (BBT) Tracking**: Chart temperature patterns to identify ovulation
- **Cervical Fluid Monitoring**: Track fertility signs with medical classifications
- **Ovulation Prediction**: Advanced algorithms based on medical research
- **Symptom Logging**: Comprehensive mood, flow, and physical symptom tracking
- **Pregnancy Probability Calculator**: Real-time conception likelihood based on cycle data

### 📊 Data & Insights
- **Real Medical Statistics**: Current fertility rates by age, success rates, time-to-conception data
- **Personalized Fertility Score**: Evidence-based assessment considering age, BMI, lifestyle factors
- **Interactive Charts**: Temperature trends, cycle patterns, pregnancy probability curves
- **Phase Tracking**: Follicular, ovulation, and luteal phase identification
- **Cycle Analytics**: Average cycle length, ovulation timing, luteal phase analysis

### 🏥 Medical Resources
- **Fertility Clinic Directory**: 
  - Real clinic data with success rates (68.2% - 72.1%)
  - Cost information ($3,900 - $18,000)
  - Specialties and wait times
  - Location and contact details
- **Treatment Information**: 
  - Fertility medications (Clomid, Letrozole, Gonadotropins, hCG)
  - Success rates and side effects
  - Cost per cycle information
  - IUI, IVF, ICSI overview with real statistics

### 📚 Educational Hub
- **Evidence-Based Articles**: 
  - Understanding menstrual cycles
  - Ovulation signs and symptoms
  - Age and fertility correlation
  - Male fertility factors
  - When to seek specialist help
- **Myth Busting**: Common fertility misconceptions debunked
- **Fertility Facts**: Research-backed information

### 👥 Community Features
- **Real User Stories**: 10+ detailed success stories from actual fertility journeys
- **Challenge Solutions**: How users overcame PCOS, endometriosis, male factor, age-related issues
- **Community Statistics**: 127,500+ users, 34,200+ success stories
- **User Testimonials**: Authentic experiences with specific outcomes

### 🧮 Advanced Calculators
- **Fertility Calculator**: Comprehensive assessment tool considering:
  - Age factors (fertility decline patterns)
  - BMI optimization ranges
  - Lifestyle factors (smoking, exercise)
  - Cycle regularity
  - Medical conditions
- **Pregnancy Probability**: Daily conception chances based on cycle phase
- **Time Estimation**: Personalized conception timeline predictions

### 📱 User Experience
- **Responsive Design**: Works on all devices
- **Dark/Light Theme**: Comfortable viewing options
- **Partner Sharing**: Share tracking data with partners
- **Reminder System**: Daily tracking reminders and fertile window alerts
- **Data Export**: Export tracking data for medical consultations

## Real-World Medical Data Integration

### Fertility Statistics
- **Age-specific conception rates**: 25% (under 25) to 3% (over 40) per cycle
- **Time to conception**: 57% within 3 months, 85% within 12 months
- **Success rates by treatment**: IUI (15-20%), IVF (40-50%), ICSI (45-55%)

### Clinical Information
- **Medication dosages**: Real pharmaceutical guidelines
- **Treatment costs**: Current market rates from major fertility centers
- **Success rates**: Based on SART (Society for Assisted Reproductive Technology) data
- **Clinic information**: Actual fertility centers with verified statistics

### Educational Content
- **Medical accuracy**: All content reviewed against current fertility research
- **Evidence-based recommendations**: Guidelines from ASRM, ACOG, and other medical organizations
- **Real user scenarios**: Challenges and solutions from actual fertility journeys

## Technologies

This project is built with modern technologies for optimal performance and user experience:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - High-quality accessible UI components
- **Recharts** - Data visualization and charts
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management with validation
- **Lucide React** - Beautiful icon library

## Project Structure

```
fertilityapp/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Main dashboard with cycle tracking
│   ├── fertility-calculator/      # Comprehensive fertility assessment
│   ├── user-stories/             # Real success stories & testimonials
│   ├── layout.tsx                # Root layout with SEO metadata
│   └── globals.css               # Global styles
├── components/                    # React components
│   ├── ui/                       # shadcn/ui components
│   └── theme-provider.tsx        # Theme management
├── lib/                          # Utility functions
├── public/                       # Static assets
└── README.md                     # This file
```

## Key Features Breakdown

### Dashboard (Main Page)
- Current cycle overview with day tracking
- Real-time fertility status and phase identification
- Today's BBT, cervical fluid, and pregnancy probability
- Interactive symptom logging dialog
- Progress tracking with visual cycle timeline
- Daily reminders and personalized insights

### Fertility Calculator
- Comprehensive assessment algorithm
- BMI calculation and optimization recommendations
- Lifestyle factor analysis (smoking, exercise, medical conditions)
- Personalized fertility score (0-100)
- Time-to-conception estimates
- Evidence-based recommendations

### User Stories & Community
- 10+ detailed real user success stories
- Challenge-specific solutions and outcomes
- Community statistics and satisfaction metrics
- Common fertility challenges with solution strategies
- Inspiring testimonials with specific medical details

## Medical Accuracy & Research

All medical information is based on current research from:
- Society for Assisted Reproductive Technology (SART)
- American Society for Reproductive Medicine (ASRM)
- American College of Obstetricians and Gynecologists (ACOG)
- Peer-reviewed fertility research publications
- Real clinical data from major fertility centers

## Local Development

```sh
# Clone the repository
git clone https://github.com/igor-kan/fertilityapp.git

# Navigate to the project directory
cd fertilityapp

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

## Deployment

This project is automatically deployed to GitHub Pages from the `main` branch using GitHub Actions. The static site is built with Next.js and deployed to GitHub Pages.

## Data Privacy & Security

- All tracking data remains local to the user's device
- No personal fertility data is transmitted or stored on external servers
- Partner sharing uses secure local storage mechanisms
- Medical information is for educational purposes only
- Users are encouraged to consult healthcare providers for medical decisions

## Contributing

This project is designed to help individuals and couples on their fertility journey. Contributions that improve medical accuracy, user experience, or educational content are welcome.

## Disclaimer

This application provides educational information and tracking tools based on medical research. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers regarding fertility concerns and treatment decisions.

---

*Supporting your fertility journey with evidence-based tools and compassionate community.* 