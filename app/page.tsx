"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingDown,
  Users,
  Globe,
  MessageCircle,
  TreePine,
  ChevronDown,
  BookOpen,
  Heart,
  Home,
  GraduationCap,
  Briefcase,
  DollarSign,
  Baby,
  Calendar,
  MapPin,
  Quote,
  ArrowRight,
  Lightbulb,
  Target,
  PenTool,
  Send,
  Share2,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

// Data for fertility trends
const fertilityData = [
  { year: 1950, global: 4.97, developed: 2.84, developing: 6.17 },
  { year: 1970, global: 4.45, developed: 2.16, developing: 5.44 },
  { year: 1990, global: 3.44, developed: 1.68, developing: 4.23 },
  { year: 2010, global: 2.52, developed: 1.66, developing: 2.87 },
  { year: 2024, global: 2.25, developed: 1.58, developing: 2.58 },
  { year: 2050, global: 1.95, developed: 1.45, developing: 2.1 },
]

// Country data for below replacement
const countriesData = [
  { country: "South Korea", rate: 0.81, population: 51.8, decline: -50 },
  { country: "Singapore", rate: 1.05, population: 5.9, decline: -35 },
  { country: "Japan", rate: 1.26, population: 125.8, decline: -40 },
  { country: "Italy", rate: 1.24, population: 59.1, decline: -45 },
  { country: "Spain", rate: 1.19, population: 47.4, decline: -42 },
  { country: "Germany", rate: 1.54, population: 83.2, decline: -25 },
]

// Factors affecting fertility
const fertilityFactors = [
  {
    icon: Home,
    title: "Housing Costs",
    description: "Rising property prices make family formation financially challenging",
    impact: 85,
    color: "bg-red-500",
  },
  {
    icon: GraduationCap,
    title: "Student Debt",
    description: "Educational loans delay financial stability needed for children",
    impact: 72,
    color: "bg-orange-500",
  },
  {
    icon: Heart,
    title: "Delayed Marriage",
    description: "Later partnerships reduce fertile years and family formation time",
    impact: 68,
    color: "bg-pink-500",
  },
  {
    icon: Briefcase,
    title: "Career Culture",
    description: "Work demands and advancement pressure compete with family time",
    impact: 75,
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Social Atomization",
    description: "Weakened community bonds reduce support systems for families",
    impact: 63,
    color: "bg-purple-500",
  },
  {
    icon: Globe,
    title: "Environmental Fear",
    description: "Climate anxiety influences reproductive decisions",
    impact: 58,
    color: "bg-green-500",
  },
]

// Testimonials
const testimonials = [
  {
    quote:
      "I thought I was too selfish to have kids. Then I realized raising a child might be the most generous thing I could do.",
    author: "Sarah, 32, Mother of Two",
    location: "Portland, OR",
  },
  {
    quote: "The climate crisis made me hesitant, but I decided to raise children who could be part of the solution.",
    author: "Miguel, 29, Expecting Father",
    location: "Barcelona, Spain",
  },
  {
    quote: "After years of thinking kids would ruin my career, I found they gave it deeper meaning.",
    author: "Dr. Chen, 35, Pediatrician",
    location: "Singapore",
  },
]

// Letters to the unborn
const sampleLetters = [
  {
    id: 1,
    preview: "Dear future child, I'm writing this in 2024, wondering if you'll exist...",
    author: "Anonymous",
    date: "2 days ago",
    likes: 47,
  },
  {
    id: 2,
    preview: "To my maybe-daughter: The world is complicated right now, but there's so much beauty...",
    author: "Hope_seeker",
    date: "1 week ago",
    likes: 89,
  },
  {
    id: 3,
    preview: "I used to think bringing you into this world would be cruel. Now I think not bringing you would be...",
    author: "Changed_mind",
    date: "3 days ago",
    likes: 156,
  },
]

export default function BloomPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showProNatalist, setShowProNatalist] = useState(true)
  const [roadmapStep, setRoadmapStep] = useState(0)
  const [roadmapData, setRoadmapData] = useState({
    age: 28,
    relationship: "",
    housing: "",
    finances: "",
    timeline: 5,
    concerns: [],
  })
  const [letterText, setLetterText] = useState("")
  const [showLetterDialog, setShowLetterDialog] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState(null)

  // Intersection Observer for scroll animations
  const sectionRefs = useRef([])
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const addToRefs = (el, index) => {
    if (el && !sectionRefs.current[index]) {
      sectionRefs.current[index] = el
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-green-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TreePine className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-green-800">Bloom</h1>
              <p className="text-xs text-green-600">A page for those who plant seeds for tomorrow</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#crisis" className="text-gray-600 hover:text-green-600 transition-colors">
              The Crisis
            </a>
            <a href="#matters" className="text-gray-600 hover:text-green-600 transition-colors">
              Why It Matters
            </a>
            <a href="#causes" className="text-gray-600 hover:text-green-600 transition-colors">
              What Shapes It
            </a>
            <a href="#philosophies" className="text-gray-600 hover:text-green-600 transition-colors">
              Philosophies
            </a>
            <a href="#reimagining" className="text-gray-600 hover:text-green-600 transition-colors">
              Reimagining
            </a>
            <a href="#tools" className="text-gray-600 hover:text-green-600 transition-colors">
              Tools
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 animate-fade-in">
            <TreePine className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-light text-green-800 mb-6 tracking-tight">Bloom</h1>
            <p className="text-2xl md:text-3xl text-green-600 mb-8 font-light">
              A page for those who plant seeds for tomorrow
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">90</div>
                <div className="text-gray-600">Countries below replacement rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2.25</div>
                <div className="text-gray-600">Global fertility rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                <div className="text-gray-600">Population decline by 2100</div>
              </div>
            </div>

            <blockquote className="text-xl text-gray-700 italic leading-relaxed">
              "Every generation is a relay. What happens when no one runs the next lap?"
            </blockquote>
          </div>

          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-lg"
            onClick={() => document.getElementById("crisis").scrollIntoView({ behavior: "smooth" })}
          >
            Begin the Journey
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Section 1: Where We Are - The Fertility Collapse */}
      <section
        id="crisis"
        className="py-20 px-6 bg-gradient-to-r from-red-50 to-orange-50"
        ref={(el) => addToRefs(el, 0)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <TrendingDown className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Where We Are</h2>
            <p className="text-2xl text-red-600 mb-4">The Fertility Collapse</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              In 90 countries, the fertility rate is below replacement. Some will lose half their population within a
              lifetime.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Global Fertility Decline</CardTitle>
                <CardDescription className="text-lg">The dramatic fall from 1950 to projected 2050</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={fertilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area type="monotone" dataKey="global" stroke="#dc2626" fill="url(#gradient)" strokeWidth={3} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Countries in Crisis</CardTitle>
                <CardDescription className="text-lg">Population decline projections by 2100</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countriesData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-800">{country.country}</div>
                        <div className="text-sm text-gray-600">
                          Rate: {country.rate} | Pop: {country.population}M
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{country.decline}%</div>
                        <div className="text-xs text-gray-500">by 2100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl inline-block">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">What if current trends continue?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">2050</div>
                  <div className="text-gray-600">Global population peaks</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2080</div>
                  <div className="text-gray-600">Rapid aging begins</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-700 mb-2">2100</div>
                  <div className="text-gray-600">Population collapse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why It Matters */}
      <section id="matters" className="py-20 px-6 bg-white" ref={(el) => addToRefs(el, 1)}>
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Why It Matters</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Beyond numbers and statistics, this is about the continuation of human stories, dreams, and possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 shadow-xl">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-pink-500 mb-4" />
                  <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-light text-gray-800 mb-6">Voices from Demographers</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <blockquote className="text-lg text-gray-700 italic">
                "The demographic transition isn't just about numbers—it's about the future of human civilization and the
                stories we'll never hear."
                <footer className="text-sm text-gray-600 mt-2">— Dr. Sarah Chen, Harvard Population Studies</footer>
              </blockquote>
              <blockquote className="text-lg text-gray-700 italic">
                "We're witnessing the end of the population explosion and the beginning of something unprecedented in
                human history."
                <footer className="text-sm text-gray-600 mt-2">
                  — Prof. Michael Rodriguez, Demographics Institute
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What Shapes the Crisis */}
      <section
        id="causes"
        className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50"
        ref={(el) => addToRefs(el, 2)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-400 ${visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Target className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">What Shapes the Crisis</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the complex web of factors that influence our reproductive choices.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {fertilityFactors.map((factor, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`p-3 rounded-xl ${factor.color}`}>
                      <factor.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{factor.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impact Level</span>
                      <span className="font-semibold">{factor.impact}%</span>
                    </div>
                    <Progress value={factor.impact} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Interconnected Web</h3>
                <p className="text-gray-600 max-w-2xl">
                  These factors don't exist in isolation. Housing costs affect career decisions, which influence
                  relationship timing, which impacts family formation. Understanding these connections is key to finding
                  solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Understanding Pro/Antinatalism */}
      <section id="philosophies" className="py-20 px-6 bg-white" ref={(el) => addToRefs(el, 3)}>
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-600 ${visibleSections.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <BookOpen className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Understanding Philosophies</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Exploring the ethical, philosophical, and moral frameworks that shape our thinking about bringing life
              into the world.
            </p>
          </div>

          <div className="mb-12 text-center">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <Button
                variant={showProNatalist ? "default" : "ghost"}
                onClick={() => setShowProNatalist(true)}
                className="rounded-full px-8 py-2"
              >
                Pro-Natalist Views
              </Button>
              <Button
                variant={!showProNatalist ? "default" : "ghost"}
                onClick={() => setShowProNatalist(false)}
                className="rounded-full px-8 py-2"
              >
                Anti-Natalist Views
              </Button>
            </div>
          </div>

          {showProNatalist ? (
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">The Case for Life</CardTitle>
                  <CardDescription className="text-lg text-green-600">
                    Arguments in favor of bringing children into the world
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-green-800 mb-2">Human Potential</h4>
                    <p className="text-gray-700">
                      Every child represents unlimited potential—the next scientist, artist, or humanitarian who could
                      change the world.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-green-800 mb-2">Meaning & Legacy</h4>
                    <p className="text-gray-700">
                      Parenthood offers profound meaning and the opportunity to pass on values, knowledge, and love to
                      future generations.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-green-800 mb-2">Human Resilience</h4>
                    <p className="text-gray-700">
                      Throughout history, humans have faced challenges and found ways to create beauty, joy, and
                      progress despite difficulties.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-green-800 mb-2">Philosophical Foundations</h4>
                    <p className="text-gray-700 text-sm italic">
                      "The duty of man is to live, to preserve life, and to improve the conditions of life." — Confucian
                      ethics
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800">Religious & Cultural Perspectives</CardTitle>
                  <CardDescription className="text-lg text-blue-600">
                    Spiritual and traditional views on family and procreation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Sacred Duty</h4>
                    <p className="text-gray-700">
                      Many traditions view procreation as a sacred responsibility to continue the human story.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Community Continuity</h4>
                    <p className="text-gray-700">
                      Children ensure the survival of cultures, languages, and wisdom traditions.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Divine Gift</h4>
                    <p className="text-gray-700">
                      Life is seen as a precious gift to be cherished and shared with new generations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800">Ethical Concerns</CardTitle>
                  <CardDescription className="text-lg text-red-600">
                    Arguments questioning the ethics of procreation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h4 className="font-semibold text-red-800 mb-2">Suffering & Consent</h4>
                    <p className="text-gray-700">
                      Life inevitably contains suffering, and we cannot obtain consent from those we bring into
                      existence.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-6">
                    <h4 className="font-semibold text-red-800 mb-2">Environmental Impact</h4>
                    <p className="text-gray-700">
                      Each new person contributes to environmental degradation and resource consumption.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-6">
                    <h4 className="font-semibold text-red-800 mb-2">Uncertain Future</h4>
                    <p className="text-gray-700">
                      Climate change, inequality, and other challenges make the future uncertain for new generations.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-6">
                    <h4 className="font-semibold text-red-800 mb-2">Philosophical Foundations</h4>
                    <p className="text-gray-700 text-sm italic">
                      "It would be better never to have been born." — Schopenhauer's pessimism
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-800">Practical Considerations</CardTitle>
                  <CardDescription className="text-lg text-orange-600">
                    Real-world factors influencing reproductive decisions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h4 className="font-semibold text-orange-800 mb-2">Economic Burden</h4>
                    <p className="text-gray-700">
                      The high cost of raising children in modern society creates financial stress.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h4 className="font-semibold text-orange-800 mb-2">Personal Freedom</h4>
                    <p className="text-gray-700">
                      Childlessness allows for greater personal autonomy and life choices.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h4 className="font-semibold text-orange-800 mb-2">Career Impact</h4>
                    <p className="text-gray-700">
                      Parenthood can significantly impact career advancement and professional goals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-xl inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Finding Balance</h3>
                <p className="text-gray-600 max-w-3xl leading-relaxed">
                  Both perspectives offer valuable insights. The goal isn't to dismiss either view, but to understand
                  how they shape our thinking and help individuals make informed, authentic decisions about parenthood.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Reimagining Parenthood */}
      <section
        id="reimagining"
        className="py-20 px-6 bg-gradient-to-r from-green-50 to-teal-50"
        ref={(el) => addToRefs(el, 4)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-800 ${visibleSections.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Lightbulb className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Reimagining Parenthood</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Exploring new models of family, innovative solutions, and supportive policies that make parenthood more
              accessible and sustainable.
            </p>
          </div>

          <Tabs defaultValue="families" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="families" className="text-lg py-3">
                Modern Families
              </TabsTrigger>
              <TabsTrigger value="solutions" className="text-lg py-3">
                Tech & Policy
              </TabsTrigger>
              <TabsTrigger value="support" className="text-lg py-3">
                Support Systems
              </TabsTrigger>
            </TabsList>

            <TabsContent value="families" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardContent className="p-8 text-center">
                    <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Single Parents by Choice</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Growing numbers of individuals choosing parenthood without traditional partnerships, supported by
                      sperm banks, adoption, and community networks.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">LGBTQ+ Families</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Same-sex couples and transgender individuals creating families through IVF, surrogacy, adoption,
                      and other assisted reproductive technologies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardContent className="p-8 text-center">
                    <Home className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Intergenerational Homes</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Multi-generational living arrangements providing built-in childcare, shared resources, and
                      stronger family bonds.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="solutions" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Technology Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Egg Freezing Subsidies</h4>
                        <p className="text-gray-600 text-sm">
                          Employer-sponsored fertility preservation for career flexibility
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">AI-Powered Childcare</h4>
                        <p className="text-gray-600 text-sm">
                          Smart monitoring and educational tools for modern parents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Remote Work Revolution</h4>
                        <p className="text-gray-600 text-sm">
                          Flexible work enabling better work-life balance for families
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Policy Innovations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Universal Pre-K</h4>
                        <p className="text-gray-600 text-sm">Free early childhood education reducing family costs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Baby Bonds</h4>
                        <p className="text-gray-600 text-sm">Government savings accounts for every newborn's future</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Housing First Policies</h4>
                        <p className="text-gray-600 text-sm">Priority housing assistance for families with children</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Community Models</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-l-4 border-purple-400 pl-6">
                      <h4 className="font-semibold text-purple-800 mb-2">Childcare Cooperatives</h4>
                      <p className="text-gray-700">
                        Parent-run childcare sharing networks reducing costs and building community
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-6">
                      <h4 className="font-semibold text-purple-800 mb-2">Intentional Communities</h4>
                      <p className="text-gray-700">
                        Co-housing and eco-villages designed around family support and shared resources
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-6">
                      <h4 className="font-semibold text-purple-800 mb-2">Neighborhood Networks</h4>
                      <p className="text-gray-700">
                        Local support groups for parents sharing resources, advice, and childcare
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Success Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">Sweden's Model</h4>
                      <p className="text-green-700 text-sm">
                        Comprehensive parental leave and childcare leading to fertility rate recovery
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-2">France's Approach</h4>
                      <p className="text-blue-700 text-sm">
                        Family allowances and work-life balance policies maintaining stable birth rates
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-purple-800 mb-2">Local Innovations</h4>
                      <p className="text-purple-700 text-sm">
                        Community-led initiatives creating supportive environments for families
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Section 6: Learn & Decide */}
      <section id="learn" className="py-20 px-6 bg-white" ref={(el) => addToRefs(el, 5)}>
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1000 ${visibleSections.has(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <BookOpen className="h-16 w-16 text-indigo-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Learn & Decide</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Myth-busting, evidence-based answers to common questions about parenthood and family planning.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Do kids make people less happy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Research shows a complex picture: short-term happiness may dip, but long-term life satisfaction and
                  meaning often increase.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore the Research
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Can people afford children today?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  While costs have risen, families adapt and find ways. Many expenses are optional, and support systems
                  can help significantly.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  See the Numbers
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Is the planet too crowded?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Population growth is slowing globally. The challenge is distribution and consumption patterns, not
                  absolute numbers.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Understand the Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 7: Tools and Paths */}
      <section
        id="tools"
        className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50"
        ref={(el) => addToRefs(el, 6)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1200 ${visibleSections.has(6) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Target className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Tools & Paths</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Interactive tools to help you explore your values, plan your future, and make informed decisions about
              parenthood.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-purple-500" />
                  <span>Create My Parenthood Roadmap</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Interactive life planning tool to explore how parenthood might fit into your future
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {roadmapStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Your Current Age</Label>
                      <Slider
                        value={[roadmapData.age]}
                        onValueChange={(value) => setRoadmapData({ ...roadmapData, age: value[0] })}
                        max={50}
                        min={18}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-center text-2xl font-bold text-purple-600 mt-2">{roadmapData.age}</div>
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Relationship Status</Label>
                      <Select onValueChange={(value) => setRoadmapData({ ...roadmapData, relationship: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="dating">Dating</SelectItem>
                          <SelectItem value="committed">In a committed relationship</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => setRoadmapStep(1)} disabled={!roadmapData.relationship}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {roadmapStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Housing Situation</Label>
                      <Select onValueChange={(value) => setRoadmapData({ ...roadmapData, housing: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your housing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent-studio">Renting studio/1BR</SelectItem>
                          <SelectItem value="rent-family">Renting family-sized</SelectItem>
                          <SelectItem value="own-small">Own small place</SelectItem>
                          <SelectItem value="own-family">Own family-sized home</SelectItem>
                          <SelectItem value="family">Living with family</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Financial Readiness</Label>
                      <Select onValueChange={(value) => setRoadmapData({ ...roadmapData, finances: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your situation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="struggling">Struggling financially</SelectItem>
                          <SelectItem value="stable">Financially stable</SelectItem>
                          <SelectItem value="comfortable">Comfortable with savings</SelectItem>
                          <SelectItem value="secure">Very financially secure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setRoadmapStep(0)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setRoadmapStep(2)}
                        disabled={!roadmapData.housing || !roadmapData.finances}
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {roadmapStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Ideal Timeline for First Child</Label>
                      <Slider
                        value={[roadmapData.timeline]}
                        onValueChange={(value) => setRoadmapData({ ...roadmapData, timeline: value[0] })}
                        max={15}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-center text-xl font-bold text-purple-600 mt-2">
                        {roadmapData.timeline} year{roadmapData.timeline !== 1 ? "s" : ""} from now
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-purple-800 mb-2">Your Roadmap Preview</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <div>Age when having first child: {roadmapData.age + roadmapData.timeline}</div>
                        <div>Current relationship: {roadmapData.relationship}</div>
                        <div>Housing: {roadmapData.housing}</div>
                        <div>Finances: {roadmapData.finances}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setRoadmapStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1">Get Full Roadmap</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center space-x-3">
                  <Lightbulb className="h-8 w-8 text-yellow-500" />
                  <span>Decision Tree Explorer</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Explore your values, fears, and hopes about parenthood
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-yellow-800 mb-3">What matters most to you?</h4>
                    <div className="space-y-2">
                      {[
                        "Personal freedom and flexibility",
                        "Career advancement and achievement",
                        "Deep relationships and family bonds",
                        "Making a positive impact on the world",
                        "Financial security and stability",
                        "Adventure and new experiences",
                      ].map((value, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-yellow-700">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-3">What are your biggest concerns?</h4>
                    <div className="space-y-2">
                      {[
                        "Financial burden and costs",
                        "Impact on career and goals",
                        "Loss of personal time and freedom",
                        "Environmental and climate issues",
                        "Relationship changes and stress",
                        "Responsibility and life changes",
                      ].map((concern, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-red-700">{concern}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">Get Personalized Insights</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 text-center">Resource Guide</CardTitle>
                <CardDescription className="text-lg text-center">
                  Support groups, financial aid, medical information, and communities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Support Groups</h4>
                    <p className="text-sm text-gray-600">
                      Find local and online communities for parents and those considering parenthood
                    </p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Financial Aid</h4>
                    <p className="text-sm text-gray-600">
                      Discover grants, tax credits, and assistance programs for families
                    </p>
                  </div>
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Medical Info</h4>
                    <p className="text-sm text-gray-600">
                      Fertility resources, pregnancy care, and family health information
                    </p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Communities</h4>
                    <p className="text-sm text-gray-600">Family-friendly neighborhoods and intentional communities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 8: Letters to the Unborn */}
      <section
        id="letters"
        className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50"
        ref={(el) => addToRefs(el, 7)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1400 ${visibleSections.has(7) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <PenTool className="h-16 w-16 text-indigo-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Letters to the Unborn</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A space for reflection, hope, and connection. Write to a potential future child or read letters from
              others exploring parenthood.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Write Your Letter</CardTitle>
                <CardDescription className="text-lg">
                  Share your thoughts, hopes, fears, or dreams with a potential future child
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Dear future child..."
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anonymous" className="rounded" />
                    <Label htmlFor="anonymous" className="text-sm">
                      Post anonymously
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="private" className="rounded" />
                    <Label htmlFor="private" className="text-sm">
                      Keep private
                    </Label>
                  </div>
                </div>
                <Button
                  className="w-full"
                  disabled={!letterText.trim()}
                  onClick={() => {
                    setLetterText("")
                    // Handle letter submission
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Share Your Letter
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Recent Letters</CardTitle>
                <CardDescription className="text-lg">
                  Read anonymous letters from others on their parenthood journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className="bg-indigo-50 p-4 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    <p className="text-gray-700 mb-3 line-clamp-2">{letter.preview}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>by {letter.author}</span>
                        <span>{letter.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{letter.likes}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-indigo-600 hover:text-indigo-800"
                      onClick={() => setSelectedLetter(letter)}
                    >
                      Read full letter
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Letters
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl inline-block">
              <CardContent className="p-8">
                <Quote className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <blockquote className="text-xl text-gray-700 italic mb-4 max-w-2xl">
                  "Writing to my potential future child helped me understand my own heart. Whether or not they ever
                  exist, the love I discovered in that letter is real."
                </blockquote>
                <footer className="text-gray-600">— Anonymous letter writer</footer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 9: Voices & Forums */}
      <section id="voices" className="py-20 px-6 bg-white" ref={(el) => addToRefs(el, 8)}>
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1600 ${visibleSections.has(8) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <MessageCircle className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-5xl font-light text-gray-800 mb-6">Voices & Forums</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join thoughtful conversations about parenthood, family planning, and the future of humanity.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Personal Stories</CardTitle>
                <CardDescription>Real experiences from parents and those considering parenthood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">"From Childfree to Parent"</h4>
                    <p className="text-xs text-gray-600">How my perspective changed over time...</p>
                    <div className="text-xs text-gray-500 mt-2">Sarah, 34 • 2 days ago</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">"Single Parent by Choice"</h4>
                    <p className="text-xs text-gray-600">My journey to motherhood without a partner...</p>
                    <div className="text-xs text-gray-500 mt-2">Maria, 38 • 5 days ago</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">"Climate Anxiety and Kids"</h4>
                    <p className="text-xs text-gray-600">Wrestling with environmental concerns...</p>
                    <div className="text-xs text-gray-500 mt-2">Alex, 29 • 1 week ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Share Your Story
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Local Efforts</CardTitle>
                <CardDescription>Community initiatives supporting families</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Portland Childcare Co-op</h4>
                    <p className="text-xs text-gray-600">Parent-run cooperative reducing costs...</p>
                    <div className="text-xs text-gray-500 mt-2">Portland, OR • Active</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Barcelona Baby Bonds</h4>
                    <p className="text-xs text-gray-600">City program providing savings accounts...</p>
                    <div className="text-xs text-gray-500 mt-2">Barcelona, Spain • Pilot</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Tokyo Work-Life Initiative</h4>
                    <p className="text-xs text-gray-600">Corporate policies supporting families...</p>
                    <div className="text-xs text-gray-500 mt-2">Tokyo, Japan • Growing</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Start Local Initiative
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Discussion Topics</CardTitle>
                <CardDescription>Guided conversations on key issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Balancing Career & Family</h4>
                    <p className="text-xs text-gray-600">47 participants • Moderated</p>
                    <div className="text-xs text-gray-500 mt-2">Last activity: 2 hours ago</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Financial Planning for Kids</h4>
                    <p className="text-xs text-gray-600">89 participants • Expert-led</p>
                    <div className="text-xs text-gray-500 mt-2">Last activity: 6 hours ago</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Alternative Family Structures</h4>
                    <p className="text-xs text-gray-600">23 participants • Open discussion</p>
                    <div className="text-xs text-gray-500 mt-2">Last activity: 1 day ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 text-center">Community Guidelines</CardTitle>
              <CardDescription className="text-lg text-center">
                Creating a safe, respectful space for all perspectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Empathy First</h4>
                  <p className="text-sm text-gray-600">Approach every conversation with understanding and compassion</p>
                </div>
                <div>
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">All Perspectives Welcome</h4>
                  <p className="text-sm text-gray-600">
                    Whether parent, childless by choice, or undecided—all voices matter
                  </p>
                </div>
                <div>
                  <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Evidence-Based</h4>
                  <p className="text-sm text-gray-600">Ground discussions in research, data, and lived experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 10: A Hopeful Future */}
      <section
        id="future"
        className="py-20 px-6 bg-gradient-to-r from-green-50 to-blue-50"
        ref={(el) => addToRefs(el, 9)}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1800 ${visibleSections.has(9) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <TreePine className="h-20 w-20 text-green-600 mx-auto mb-8" />
            <h2 className="text-6xl font-light text-gray-800 mb-8">A Hopeful Future</h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-3xl text-gray-700 italic leading-relaxed mb-8">
                "The future is not something that happens to us. It's something we create—or fail to."
              </blockquote>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Every choice we make about family, community, and the next generation shapes the world to come. Whether
                you choose parenthood or not, you are part of this conversation about humanity's future.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <Baby className="h-16 w-16 text-pink-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Those Choosing Parenthood</h3>
                <p className="text-gray-600 leading-relaxed">
                  You are planting seeds for tomorrow. Your children will inherit both challenges and opportunities to
                  build a better world.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Those Choosing Otherwise</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your choice is equally valid. You contribute to the future through mentorship, creativity, and
                  supporting the next generation in other ways.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <Lightbulb className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Those Still Deciding</h3>
                <p className="text-gray-600 leading-relaxed">
                  Take your time. Explore your values, fears, and dreams. The most important thing is making an
                  authentic choice that aligns with who you are.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-0 shadow-2xl inline-block">
              <CardContent className="p-12">
                <h3 className="text-3xl font-semibold text-gray-800 mb-6">Join the Conversation</h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                  Whether you're a parent, considering parenthood, or committed to a child-free life, your voice matters
                  in shaping a future that works for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                    Share Your Story
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    Explore Resources
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TreePine className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-2xl font-bold">Bloom</h3>
                <p className="text-sm text-gray-400">A page for those who plant seeds for tomorrow</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              This project is dedicated to fostering informed, compassionate dialogue about one of humanity's most
              important decisions: whether and how to bring new life into the world.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#crisis" className="hover:text-white transition-colors">
                    The Fertility Crisis
                  </a>
                </li>
                <li>
                  <a href="#matters" className="hover:text-white transition-colors">
                    Why It Matters
                  </a>
                </li>
                <li>
                  <a href="#causes" className="hover:text-white transition-colors">
                    What Shapes It
                  </a>
                </li>
                <li>
                  <a href="#philosophies" className="hover:text-white transition-colors">
                    Philosophies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#tools" className="hover:text-white transition-colors">
                    Parenthood Roadmap
                  </a>
                </li>
                <li>
                  <a href="#tools" className="hover:text-white transition-colors">
                    Decision Tree
                  </a>
                </li>
                <li>
                  <a href="#learn" className="hover:text-white transition-colors">
                    Myth Busting
                  </a>
                </li>
                <li>
                  <a href="#tools" className="hover:text-white transition-colors">
                    Resource Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#letters" className="hover:text-white transition-colors">
                    Letters to the Unborn
                  </a>
                </li>
                <li>
                  <a href="#voices" className="hover:text-white transition-colors">
                    Discussion Forums
                  </a>
                </li>
                <li>
                  <a href="#voices" className="hover:text-white transition-colors">
                    Personal Stories
                  </a>
                </li>
                <li>
                  <a href="#voices" className="hover:text-white transition-colors">
                    Local Initiatives
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research Sources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Bloom. Created with hope for informed, compassionate choices about the future.
            </p>
          </div>
        </div>
      </footer>

      {/* Letter Reading Dialog */}
      <Dialog open={!!selectedLetter} onOpenChange={() => setSelectedLetter(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Letter to the Unborn</DialogTitle>
            <DialogDescription>
              by {selectedLetter?.author} • {selectedLetter?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">{selectedLetter?.preview}</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2 text-red-500" />
                  {selectedLetter?.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
