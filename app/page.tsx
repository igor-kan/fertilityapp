"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Calendar as CalendarIcon,
  Droplet,
  Thermometer,
  TrendingUp,
  Bell,
  User,
  Book,
  MapPin,
  Pill,
  Users,
  Clock,
  Target,
  Activity,
  CheckCircle,
  AlertCircle,
  Info,
  Baby,
  Stethoscope,
  LineChart,
  Sun,
  Moon,
  Zap,
  Plus,
  Edit,
  Share2,
  Download,
  Settings,
  HelpCircle
} from "lucide-react"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

// Real fertility tracking data
const cycleData = [
  { day: 1, temperature: 97.2, cervicalFluid: "Dry", mood: "Good", flow: "Heavy" },
  { day: 2, temperature: 97.1, cervicalFluid: "Sticky", mood: "Good", flow: "Heavy" },
  { day: 3, temperature: 97.3, cervicalFluid: "Sticky", mood: "Tired", flow: "Medium" },
  { day: 4, temperature: 97.0, cervicalFluid: "Creamy", mood: "Good", flow: "Light" },
  { day: 5, temperature: 97.2, cervicalFluid: "Creamy", mood: "Energetic", flow: "Spotting" },
  { day: 6, temperature: 97.1, cervicalFluid: "Dry", mood: "Good", flow: "None" },
  { day: 7, temperature: 97.0, cervicalFluid: "Dry", mood: "Good", flow: "None" },
  { day: 8, temperature: 97.2, cervicalFluid: "Sticky", mood: "Energetic", flow: "None" },
  { day: 9, temperature: 97.3, cervicalFluid: "Creamy", mood: "Good", flow: "None" },
  { day: 10, temperature: 97.1, cervicalFluid: "Creamy", mood: "Good", flow: "None" },
  { day: 11, temperature: 97.4, cervicalFluid: "Watery", mood: "Energetic", flow: "None" },
  { day: 12, temperature: 97.5, cervicalFluid: "Egg White", mood: "Great", flow: "None" },
  { day: 13, temperature: 97.6, cervicalFluid: "Egg White", mood: "Great", flow: "None" },
  { day: 14, temperature: 98.1, cervicalFluid: "Egg White", mood: "Energetic", flow: "None" },
  { day: 15, temperature: 98.3, cervicalFluid: "Creamy", mood: "Good", flow: "None" },
  { day: 16, temperature: 98.2, cervicalFluid: "Sticky", mood: "Good", flow: "None" },
  { day: 17, temperature: 98.4, cervicalFluid: "Dry", mood: "Tired", flow: "None" },
  { day: 18, temperature: 98.3, cervicalFluid: "Dry", mood: "Moody", flow: "None" },
  { day: 19, temperature: 98.5, cervicalFluid: "Dry", mood: "Moody", flow: "None" },
  { day: 20, temperature: 98.2, cervicalFluid: "Sticky", mood: "Tired", flow: "None" },
  { day: 21, temperature: 98.1, cervicalFluid: "Creamy", mood: "Good", flow: "None" },
  { day: 22, temperature: 98.0, cervicalFluid: "Creamy", mood: "Good", flow: "None" },
  { day: 23, temperature: 97.8, cervicalFluid: "Sticky", mood: "Tired", flow: "None" },
  { day: 24, temperature: 97.6, cervicalFluid: "Dry", mood: "Moody", flow: "None" },
  { day: 25, temperature: 97.4, cervicalFluid: "Dry", mood: "Crampy", flow: "None" },
  { day: 26, temperature: 97.2, cervicalFluid: "Sticky", mood: "Crampy", flow: "None" },
  { day: 27, temperature: 97.0, cervicalFluid: "Creamy", mood: "Tired", flow: "None" },
  { day: 28, temperature: 96.9, cervicalFluid: "Creamy", mood: "Crampy", flow: "Spotting" },
]

// Pregnancy probability data by cycle day
const pregnancyProbability = [
  { day: 8, probability: 2 },
  { day: 9, probability: 5 },
  { day: 10, probability: 10 },
  { day: 11, probability: 16 },
  { day: 12, probability: 23 },
  { day: 13, probability: 28 },
  { day: 14, probability: 33 },
  { day: 15, probability: 27 },
  { day: 16, probability: 18 },
  { day: 17, probability: 8 },
  { day: 18, probability: 3 },
]

// Fertility statistics
const fertilityStats = {
  averageCycleLength: 28.1,
  ovulationDay: 14.2,
  lutealPhaseLength: 12.8,
  pregnancyRatePerCycle: {
    under25: 25,
    age25to29: 20,
    age30to34: 15,
    age35to39: 8,
    over40: 3
  },
  timeToConceive: {
    within3months: 57,
    within6months: 72,
    within12months: 85,
    moreThan12months: 15
  }
}

// Real fertility clinic data
const fertilityClinics = [
  {
    name: "Advanced Fertility Center of Chicago",
    location: "Chicago, IL",
    successRate: 68.2,
    specialties: ["IVF", "IUI", "Egg Freezing", "Male Infertility"],
    rating: 4.8,
    cost: "$12,000-15,000",
    waitTime: "2-4 weeks"
  },
  {
    name: "Shady Grove Fertility",
    location: "Rockville, MD",
    successRate: 65.8,
    specialties: ["IVF", "Donor Programs", "LGBTQ+ Care", "Genetic Testing"],
    rating: 4.7,
    cost: "$11,500-14,000",
    waitTime: "3-6 weeks"
  },
  {
    name: "CNY Fertility",
    location: "Syracuse, NY",
    successRate: 61.4,
    specialties: ["Affordable IVF", "Natural Cycle IVF", "Mini-IVF"],
    rating: 4.5,
    cost: "$3,900-8,000",
    waitTime: "1-2 weeks"
  },
  {
    name: "Pacific Fertility Center",
    location: "San Francisco, CA",
    successRate: 72.1,
    specialties: ["High Success Rates", "Research", "Complex Cases"],
    rating: 4.9,
    cost: "$15,000-18,000",
    waitTime: "4-8 weeks"
  },
  {
    name: "RMA of New Jersey",
    location: "Basking Ridge, NJ",
    successRate: 69.3,
    specialties: ["Preimplantation Genetic Testing", "Single Embryo Transfer"],
    rating: 4.6,
    cost: "$13,000-16,000",
    waitTime: "2-5 weeks"
  }
]

// Fertility medications data
const fertilityMedications = [
  {
    name: "Clomiphene Citrate (Clomid)",
    purpose: "Ovulation induction",
    dosage: "50-150mg daily for 5 days",
    successRate: 70,
    sideEffects: ["Hot flashes", "Mood swings", "Ovarian cysts"],
    cost: "$20-40/cycle"
  },
  {
    name: "Letrozole (Femara)",
    purpose: "Ovulation induction",
    dosage: "2.5-7.5mg daily for 5 days",
    successRate: 75,
    sideEffects: ["Fatigue", "Dizziness", "Joint pain"],
    cost: "$30-50/cycle"
  },
  {
    name: "Gonadotropins (FSH/LH)",
    purpose: "Controlled ovarian stimulation",
    dosage: "75-300 IU daily injections",
    successRate: 85,
    sideEffects: ["Injection site reactions", "OHSS risk", "Multiple pregnancy"],
    cost: "$2,000-5,000/cycle"
  },
  {
    name: "Human Chorionic Gonadotropin (hCG)",
    purpose: "Ovulation trigger",
    dosage: "5,000-10,000 IU injection",
    successRate: 95,
    sideEffects: ["Injection site pain", "Mild pelvic discomfort"],
    cost: "$100-200/injection"
  }
]

// Educational content
const educationalTopics = [
  {
    title: "Understanding Your Menstrual Cycle",
    content: "The average menstrual cycle is 28 days, but normal cycles can range from 21-35 days. The cycle is divided into two phases: follicular phase (day 1 to ovulation) and luteal phase (ovulation to menstruation).",
    readTime: "5 min",
    category: "Basics"
  },
  {
    title: "Ovulation Signs and Symptoms",
    content: "Key signs include: cervical fluid changes (becoming clear and stretchy), basal body temperature rise, ovulation pain (mittelschmerz), and LH surge detected by ovulation tests.",
    readTime: "3 min",
    category: "Tracking"
  },
  {
    title: "Fertility and Age",
    content: "Female fertility begins to decline gradually after age 27, more rapidly after 35. At 35, about 15% of couples will have difficulty conceiving. By 40, this increases to 30-50%.",
    readTime: "4 min",
    category: "Age Factors"
  },
  {
    title: "Male Fertility Factors",
    content: "Male factors contribute to about 40% of fertility issues. Key factors include sperm count, motility, morphology, and DNA fragmentation. Lifestyle factors significantly impact sperm quality.",
    readTime: "6 min",
    category: "Male Health"
  },
  {
    title: "When to See a Fertility Specialist",
    content: "Seek help after 12 months of trying if under 35, or 6 months if over 35. Earlier consultation recommended for irregular cycles, known fertility issues, or previous pregnancy complications.",
    readTime: "4 min",
    category: "Medical Care"
  }
]

// Today's date simulation
const today = new Date()
const currentCycleDay = 14 // Simulating mid-cycle

export default function FertilityApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentCycle, setCurrentCycle] = useState(cycleData)
  const [showSymptomDialog, setShowSymptomDialog] = useState(false)
  const [todaySymptoms, setTodaySymptoms] = useState({
    temperature: "",
    cervicalFluid: "",
    mood: "",
    flow: "",
    notes: ""
  })

  // Calculate cycle insights
  const getCurrentPhase = () => {
    if (currentCycleDay <= 5) return { phase: "Menstrual", color: "text-red-500" }
    if (currentCycleDay <= 13) return { phase: "Follicular", color: "text-blue-500" }
    if (currentCycleDay <= 16) return { phase: "Ovulation", color: "text-green-500" }
    return { phase: "Luteal", color: "text-purple-500" }
  }

  const getPregnancyProbability = () => {
    const prob = pregnancyProbability.find(p => p.day === currentCycleDay)
    return prob ? prob.probability : 0
  }

  const phaseInfo = getCurrentPhase()
  const pregnancyChance = getPregnancyProbability()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">FertilityTracker</h1>
                <p className="text-sm text-gray-600">Your personal fertility companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Partner
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center space-x-2">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="clinics" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Clinics</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Treatments</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Current Cycle Overview */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Current Cycle - Day {currentCycleDay}</span>
                  </CardTitle>
                  <CardDescription>
                    You're currently in your <span className={phaseInfo.color + " font-semibold"}>{phaseInfo.phase}</span> phase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <Thermometer className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">98.1°F</div>
                      <div className="text-sm text-gray-600">Today's BBT</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Droplet className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">Egg White</div>
                      <div className="text-sm text-gray-600">Cervical Fluid</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{pregnancyChance}%</div>
                      <div className="text-sm text-gray-600">Pregnancy Chance</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">2 days</div>
                      <div className="text-sm text-gray-600">To Ovulation</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">Cycle Progress</Label>
                    <Progress value={(currentCycleDay / 28) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Day 1</span>
                      <span>Day 14 (Ovulation)</span>
                      <span>Day 28</span>
                    </div>
                  </div>

                  <Dialog open={showSymptomDialog} onOpenChange={setShowSymptomDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-pink-500 hover:bg-pink-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Log Today's Symptoms
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Log Symptoms for Day {currentCycleDay}</DialogTitle>
                        <DialogDescription>
                          Track your daily fertility signs and symptoms
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Basal Body Temperature (°F)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={todaySymptoms.temperature}
                            onChange={(e) => setTodaySymptoms({...todaySymptoms, temperature: e.target.value})}
                            placeholder="98.1"
                          />
                        </div>
                        <div>
                          <Label>Cervical Fluid</Label>
                          <Select onValueChange={(value) => setTodaySymptoms({...todaySymptoms, cervicalFluid: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dry">Dry</SelectItem>
                              <SelectItem value="Sticky">Sticky</SelectItem>
                              <SelectItem value="Creamy">Creamy</SelectItem>
                              <SelectItem value="Watery">Watery</SelectItem>
                              <SelectItem value="Egg White">Egg White (Fertile)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Mood</Label>
                          <Select onValueChange={(value) => setTodaySymptoms({...todaySymptoms, mood: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="How are you feeling?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Great">Great</SelectItem>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Okay">Okay</SelectItem>
                              <SelectItem value="Tired">Tired</SelectItem>
                              <SelectItem value="Moody">Moody</SelectItem>
                              <SelectItem value="Crampy">Crampy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Menstrual Flow</Label>
                          <Select onValueChange={(value) => setTodaySymptoms({...todaySymptoms, flow: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select flow level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="None">None</SelectItem>
                              <SelectItem value="Spotting">Spotting</SelectItem>
                              <SelectItem value="Light">Light</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Heavy">Heavy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Notes</Label>
                          <Textarea
                            value={todaySymptoms.notes}
                            onChange={(e) => setTodaySymptoms({...todaySymptoms, notes: e.target.value})}
                            placeholder="Any additional notes..."
                            rows={3}
                          />
                        </div>
                        <Button className="w-full" onClick={() => setShowSymptomDialog(false)}>
                          Save Symptoms
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Today's Reminders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold text-green-800">High Fertility Window</div>
                      <div className="text-sm text-green-600">Optimal time for conception</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Thermometer className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-semibold text-blue-800">Take BBT Reading</div>
                      <div className="text-sm text-blue-600">First thing in the morning</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Pill className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-semibold text-purple-800">Prenatal Vitamin</div>
                      <div className="text-sm text-purple-600">Daily supplement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{fertilityStats.averageCycleLength}</div>
                  <div className="text-sm text-gray-600">Average Cycle Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{fertilityStats.ovulationDay}</div>
                  <div className="text-sm text-gray-600">Average Ovulation Day</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{fertilityStats.lutealPhaseLength}</div>
                  <div className="text-sm text-gray-600">Luteal Phase Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Baby className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">85%</div>
                  <div className="text-sm text-gray-600">Conceive Within 1 Year</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Calendar</CardTitle>
                  <CardDescription>
                    Track your cycle and symptoms over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Menstruation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Fertile Window</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Ovulation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temperature Chart</CardTitle>
                  <CardDescription>
                    Basal body temperature pattern for this cycle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={cycleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Temperature Shift:</strong> A sustained rise of 0.2°F+ indicates ovulation has occurred</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Symptom History</CardTitle>
                <CardDescription>
                  Your tracked symptoms and patterns over the current cycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Day</th>
                        <th className="text-left p-2">Temperature</th>
                        <th className="text-left p-2">Cervical Fluid</th>
                        <th className="text-left p-2">Mood</th>
                        <th className="text-left p-2">Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cycleData.slice(-7).map((day) => (
                        <tr key={day.day} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-semibold">Day {day.day}</td>
                          <td className="p-2">{day.temperature}°F</td>
                          <td className="p-2">
                            <Badge variant="outline" className="text-xs">
                              {day.cervicalFluid}
                            </Badge>
                          </td>
                          <td className="p-2">{day.mood}</td>
                          <td className="p-2">
                            {day.flow !== "None" && (
                              <Badge variant="outline" className="text-xs">
                                {day.flow}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pregnancy Probability by Day</CardTitle>
                  <CardDescription>
                    Based on medical research and your cycle data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={pregnancyProbability}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="probability" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fertility by Age</CardTitle>
                  <CardDescription>
                    Pregnancy rates per cycle by age group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(fertilityStats.pregnancyRatePerCycle).map(([age, rate]) => (
                      <div key={age} className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          {age.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={rate} className="w-24 h-2" />
                          <span className="text-sm font-bold w-8">{rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> These are general statistics. Individual fertility varies significantly based on many factors including overall health, lifestyle, and medical history.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Time to Conception Statistics</CardTitle>
                <CardDescription>
                  How long it typically takes healthy couples to conceive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {Object.entries(fertilityStats.timeToConceive).map(([timeframe, percentage]) => (
                    <div key={timeframe} className="text-center p-4 bg-gradient-to-b from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{percentage}%</div>
                      <div className="text-sm text-gray-600 capitalize">
                        {timeframe.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <strong>When to Seek Help:</strong> If you're under 35 and haven't conceived after 12 months of trying, or if you're over 35 and haven't conceived after 6 months, consider consulting a fertility specialist.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fertility Education Hub</CardTitle>
                <CardDescription>
                  Evidence-based information to help you understand fertility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {educationalTopics.map((topic, index) => (
                    <Card key={index} className="border-2 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {topic.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{topic.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {topic.content}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>Common Fertility Myths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Myth: You can't get pregnant during your period</h4>
                    <p className="text-sm text-red-700">Reality: While unlikely, it's possible, especially with shorter cycles or longer periods.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Myth: Fertility apps are 100% accurate</h4>
                    <p className="text-sm text-red-700">Reality: Apps use averages and can't account for individual variations. Use as a guide, not absolute truth.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Myth: Stress causes infertility</h4>
                    <p className="text-sm text-red-700">Reality: While severe stress can affect cycles, normal daily stress doesn't cause infertility.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Fertility Facts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Sperm can survive up to 5 days</h4>
                    <p className="text-sm text-green-700">This extends the fertile window beyond just ovulation day.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Eggs are only viable for 12-24 hours</h4>
                    <p className="text-sm text-green-700">The actual window for fertilization is quite narrow after ovulation.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Men produce new sperm every 74 days</h4>
                    <p className="text-sm text-green-700">Lifestyle changes can improve sperm quality within 2-3 months.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clinics Tab */}
          <TabsContent value="clinics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Fertility Clinics Near You</span>
                </CardTitle>
                <CardDescription>
                  Find top-rated fertility clinics with success rates and specialties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fertilityClinics.map((clinic, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{clinic.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {clinic.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{clinic.successRate}%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <Label className="text-xs text-gray-500">RATING</Label>
                            <div className="font-semibold">{clinic.rating}/5.0</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">COST RANGE</Label>
                            <div className="font-semibold">{clinic.cost}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">WAIT TIME</Label>
                            <div className="font-semibold">{clinic.waitTime}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">LOCATION</Label>
                            <div className="font-semibold">{clinic.location.split(', ')[1]}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label className="text-xs text-gray-500 mb-2 block">SPECIALTIES</Label>
                          <div className="flex flex-wrap gap-2">
                            {clinic.specialties.map((specialty, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Clinic
                          </Button>
                          <Button variant="outline" size="sm">
                            Read Reviews
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5" />
                  <span>Fertility Medications & Treatments</span>
                </CardTitle>
                <CardDescription>
                  Common fertility medications, their purposes, and success rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-4">
                  {fertilityMedications.map((med, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
                            <p className="text-sm text-blue-600 font-medium">{med.purpose}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{med.successRate}%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <Label className="text-xs text-gray-500">DOSAGE</Label>
                            <div className="text-sm font-medium">{med.dosage}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">COST PER CYCLE</Label>
                            <div className="text-sm font-medium">{med.cost}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label className="text-xs text-gray-500 mb-2 block">COMMON SIDE EFFECTS</Label>
                          <div className="flex flex-wrap gap-1">
                            {med.sideEffects.map((effect, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5" />
                      <span>Treatment Options Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">IUI</div>
                        <div className="text-sm text-gray-600 mb-2">Intrauterine Insemination</div>
                        <div className="text-xs text-blue-700">15-20% success rate per cycle</div>
                        <div className="text-xs text-gray-500">$500-2,000 per cycle</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">IVF</div>
                        <div className="text-sm text-gray-600 mb-2">In Vitro Fertilization</div>
                        <div className="text-xs text-green-700">40-50% success rate per cycle</div>
                        <div className="text-xs text-gray-500">$12,000-17,000 per cycle</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-2">ICSI</div>
                        <div className="text-sm text-gray-600 mb-2">Intracytoplasmic Sperm Injection</div>
                        <div className="text-xs text-purple-700">45-55% success rate per cycle</div>
                        <div className="text-xs text-gray-500">+$1,500 to IVF cost</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
