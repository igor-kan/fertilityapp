"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Calendar, Heart, TrendingUp, AlertCircle, Info } from "lucide-react"

// Real fertility calculations based on medical research
const calculateFertilityScore = (age: number, cycleLength: number, irregularCycles: boolean, bmi: number, smokingStatus: string, exerciseLevel: string) => {
  let score = 100

  // Age factor (most significant)
  if (age < 25) score -= 0
  else if (age <= 30) score -= 5
  else if (age <= 35) score -= 15
  else if (age <= 40) score -= 35
  else score -= 60

  // Cycle regularity
  if (irregularCycles) score -= 20
  if (cycleLength < 21 || cycleLength > 35) score -= 15

  // BMI factor
  if (bmi < 18.5 || bmi > 30) score -= 15
  else if (bmi > 25) score -= 5

  // Lifestyle factors
  if (smokingStatus === "heavy") score -= 25
  else if (smokingStatus === "light") score -= 10

  if (exerciseLevel === "none") score -= 10
  else if (exerciseLevel === "excessive") score -= 15

  return Math.max(0, Math.min(100, score))
}

const getPregnancyTimeEstimate = (age: number, fertilityScore: number) => {
  const baseMonths = age < 30 ? 6 : age < 35 ? 8 : age < 40 ? 12 : 18
  const scoreMultiplier = fertilityScore / 100
  return Math.round(baseMonths / scoreMultiplier)
}

export default function FertilityCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    cycleLength: "",
    irregularCycles: "",
    bmi: "",
    height: "",
    weight: "",
    smokingStatus: "",
    exerciseLevel: "",
    medicalConditions: "",
    partnerAge: "",
    tryingDuration: ""
  })

  const [results, setResults] = useState(null)

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  const handleCalculate = () => {
    const age = parseInt(formData.age)
    const cycleLength = parseInt(formData.cycleLength)
    const weight = parseFloat(formData.weight)
    const height = parseFloat(formData.height)
    const bmi = calculateBMI(weight, height)

    const fertilityScore = calculateFertilityScore(
      age,
      cycleLength,
      formData.irregularCycles === "yes",
      bmi,
      formData.smokingStatus,
      formData.exerciseLevel
    )

    const timeEstimate = getPregnancyTimeEstimate(age, fertilityScore)

    // Age-specific pregnancy rates per cycle
    let monthlyChance = 25
    if (age < 25) monthlyChance = 25
    else if (age <= 30) monthlyChance = 20
    else if (age <= 35) monthlyChance = 15
    else if (age <= 40) monthlyChance = 8
    else monthlyChance = 3

    // Adjust for fertility score
    monthlyChance = (monthlyChance * fertilityScore) / 100

    setResults({
      fertilityScore,
      bmi: bmi.toFixed(1),
      monthlyChance: Math.round(monthlyChance),
      timeEstimate,
      recommendations: generateRecommendations(age, bmi, formData)
    })
  }

  const generateRecommendations = (age: number, bmi: number, data: any) => {
    const recommendations = []

    if (age > 35) {
      recommendations.push({
        type: "medical",
        text: "Consider consulting a fertility specialist sooner rather than later due to age-related fertility decline"
      })
    }

    if (bmi < 18.5 || bmi > 30) {
      recommendations.push({
        type: "lifestyle",
        text: "Optimize your BMI to 18.5-25 range for better fertility outcomes"
      })
    }

    if (data.smokingStatus !== "never") {
      recommendations.push({
        type: "lifestyle",
        text: "Quit smoking completely - it significantly impacts fertility and pregnancy outcomes"
      })
    }

    if (data.irregularCycles === "yes") {
      recommendations.push({
        type: "medical",
        text: "Track ovulation with ovulation predictor kits or monitor basal body temperature"
      })
    }

    if (data.exerciseLevel === "none") {
      recommendations.push({
        type: "lifestyle",
        text: "Include moderate exercise (30 minutes, 3-4 times per week) to improve fertility"
      })
    }

    if (data.exerciseLevel === "excessive") {
      recommendations.push({
        type: "lifestyle",
        text: "Reduce exercise intensity - excessive exercise can disrupt ovulation"
      })
    }

    return recommendations
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Calculator className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fertility Calculator</h1>
          <p className="text-lg text-gray-600">
            Get personalized insights about your fertility potential based on medical research
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Answer these questions to get your personalized fertility assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="28"
                  />
                </div>
                <div>
                  <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                  <Input
                    id="cycleLength"
                    type="number"
                    value={formData.cycleLength}
                    onChange={(e) => setFormData({...formData, cycleLength: e.target.value})}
                    placeholder="28"
                  />
                </div>
              </div>

              <div>
                <Label>Do you have irregular cycles?</Label>
                <Select onValueChange={(value) => setFormData({...formData, irregularCycles: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, my cycles are regular</SelectItem>
                    <SelectItem value="yes">Yes, my cycles vary significantly</SelectItem>
                    <SelectItem value="unsure">I'm not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="165"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="65"
                  />
                </div>
              </div>

              <div>
                <Label>Smoking Status</Label>
                <Select onValueChange={(value) => setFormData({...formData, smokingStatus: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="light">Light smoker (1-10 cigarettes/day)</SelectItem>
                    <SelectItem value="heavy">Heavy smoker (10+ cigarettes/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Exercise Level</Label>
                <Select onValueChange={(value) => setFormData({...formData, exerciseLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No regular exercise</SelectItem>
                    <SelectItem value="light">Light exercise (1-2 times/week)</SelectItem>
                    <SelectItem value="moderate">Moderate exercise (3-4 times/week)</SelectItem>
                    <SelectItem value="heavy">Heavy exercise (5-6 times/week)</SelectItem>
                    <SelectItem value="excessive">Excessive exercise (daily intense workouts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tryingDuration">How long have you been trying? (months)</Label>
                <Input
                  id="tryingDuration"
                  type="number"
                  value={formData.tryingDuration}
                  onChange={(e) => setFormData({...formData, tryingDuration: e.target.value})}
                  placeholder="6"
                />
              </div>

              <Button 
                onClick={handleCalculate} 
                className="w-full bg-pink-500 hover:bg-pink-600"
                disabled={!formData.age || !formData.height || !formData.weight}
              >
                Calculate My Fertility Score
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Fertility Assessment</span>
                </CardTitle>
                <CardDescription>
                  Based on current medical research and your personal factors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">{results.fertilityScore}</div>
                  <div className="text-lg text-gray-700 mb-4">Fertility Score</div>
                  <Progress value={results.fertilityScore} className="h-3" />
                  <div className="text-sm text-gray-600 mt-2">
                    {results.fertilityScore >= 80 ? "Excellent" : 
                     results.fertilityScore >= 60 ? "Good" : 
                     results.fertilityScore >= 40 ? "Fair" : "Needs Attention"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{results.monthlyChance}%</div>
                    <div className="text-sm text-gray-600">Monthly pregnancy chance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{results.timeEstimate}</div>
                    <div className="text-sm text-gray-600">Estimated months to conceive</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-semibold text-purple-800 mb-1">BMI: {results.bmi}</div>
                  <div className="text-sm text-gray-600">
                    {parseFloat(results.bmi) < 18.5 ? "Underweight" :
                     parseFloat(results.bmi) < 25 ? "Normal weight" :
                     parseFloat(results.bmi) < 30 ? "Overweight" : "Obese"}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Personalized Recommendations
                  </h3>
                  {results.recommendations.map((rec, index) => (
                    <Alert key={index}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {rec.text}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5" />
              <span>Understanding Your Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Fertility Score</h4>
                <p className="text-sm text-blue-700">
                  Combines age, BMI, lifestyle factors, and cycle regularity. Higher scores indicate better fertility potential.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Monthly Chance</h4>
                <p className="text-sm text-green-700">
                  Estimated probability of conception per menstrual cycle based on your age and health factors.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Time Estimate</h4>
                <p className="text-sm text-purple-700">
                  Average time to conception. Remember, up to 12 months is considered normal for healthy couples.
                </p>
              </div>
            </div>
            
            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This calculator provides estimates based on population data and should not replace medical advice. 
                Consult with a healthcare provider for personalized fertility assessment and guidance.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 