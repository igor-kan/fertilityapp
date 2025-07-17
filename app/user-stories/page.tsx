"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, Calendar, Baby, Star, Quote, MessageCircle, ThumbsUp } from "lucide-react"

const userStories = [
  {
    id: 1,
    name: "Sarah M.",
    age: 32,
    location: "Portland, OR",
    story: "After 8 months of trying, I discovered my cycles were longer than I thought. Tracking my BBT showed I was ovulating on day 18, not 14. We conceived the month after I adjusted our timing!",
    outcome: "Pregnant after 9 months",
    avatar: "👩‍🦰",
    tags: ["BBT Tracking", "Irregular Cycles", "Success"],
    likes: 156,
    helpful: true
  },
  {
    id: 2,
    name: "Jennifer & Mark",
    age: 29,
    location: "Austin, TX",
    story: "We were unexplained infertility for 18 months. Started tracking everything - temperature, cervical fluid, ovulation tests. Found out I had a short luteal phase (9 days). Progesterone supplements helped us conceive twins!",
    outcome: "Twins born healthy at 37 weeks",
    avatar: "👫",
    tags: ["Luteal Phase Defect", "Progesterone", "Twins", "Success"],
    likes: 203,
    helpful: true
  },
  {
    id: 3,
    name: "Maria L.",
    age: 35,
    location: "Miami, FL",
    story: "At 35, I was anxious about fertility. Started tracking immediately. My first pregnancy ended in miscarriage at 8 weeks, but tracking helped me recognize signs early and get medical care quickly. Now have a healthy 2-year-old!",
    outcome: "Healthy baby after loss",
    avatar: "🤱",
    tags: ["Age 35+", "Miscarriage", "Early Detection", "Success"],
    likes: 189,
    helpful: true
  },
  {
    id: 4,
    name: "Ashley R.",
    age: 28,
    location: "Denver, CO",
    story: "PCOS made my cycles unpredictable (35-65 days). Fertility tracking helped me identify the rare times I ovulated naturally. Used Letrozole when needed. Took 14 months but we got our rainbow baby!",
    outcome: "Overcame PCOS challenges",
    avatar: "🌈",
    tags: ["PCOS", "Letrozole", "Irregular Cycles", "Success"],
    likes: 142,
    helpful: true
  },
  {
    id: 5,
    name: "Rachel & Emma",
    age: 30,
    location: "Seattle, WA",
    story: "As a same-sex couple, timing was everything for our IUI cycles. Tracking helped us optimize timing and reduce the number of cycles needed. Our son is now 6 months old!",
    outcome: "IUI success on 3rd cycle",
    avatar: "👩‍❤️‍👩",
    tags: ["LGBTQ+", "IUI", "Timing", "Success"],
    likes: 98,
    helpful: true
  },
  {
    id: 6,
    name: "Lisa K.",
    age: 41,
    location: "Chicago, IL",
    story: "Started trying at 40. Tracking showed declining egg quality signs - shorter cycles, lighter periods. Went straight to IVF with our own eggs and conceived on first transfer. Age is just a number!",
    outcome: "IVF success at 41",
    avatar: "👩‍🍼",
    tags: ["Age 40+", "IVF", "Egg Quality", "Success"],
    likes: 276,
    helpful: true
  },
  {
    id: 7,
    name: "Amanda S.",
    age: 26,
    location: "Nashville, TN",
    story: "We conceived easily the first time but struggled with secondary infertility for 2 years. Tracking revealed I was no longer ovulating regularly after breastfeeding. Vitex and cycle tracking got me pregnant again!",
    outcome: "Secondary infertility resolved",
    avatar: "👶",
    tags: ["Secondary Infertility", "Breastfeeding", "Vitex", "Success"],
    likes: 134,
    helpful: true
  },
  {
    id: 8,
    name: "Rebecca M.",
    age: 33,
    location: "Boston, MA",
    story: "Endometriosis made everything harder. Tracking symptoms helped my doctor adjust treatment. Laparoscopic surgery plus careful cycle tracking led to pregnancy 6 months post-surgery. Don't lose hope!",
    outcome: "Pregnancy after endometriosis surgery",
    avatar: "💪",
    tags: ["Endometriosis", "Surgery", "Symptom Tracking", "Success"],
    likes: 167,
    helpful: true
  },
  {
    id: 9,
    name: "Taylor & Alex",
    age: 34,
    location: "San Francisco, CA",
    story: "Male factor infertility (low count and motility). While my husband improved his lifestyle, I tracked ovulation precisely to maximize our chances each cycle. IUI worked on the 4th try!",
    outcome: "IUI success with male factor",
    avatar: "👨‍👩‍👧",
    tags: ["Male Factor", "Lifestyle Changes", "IUI", "Success"],
    likes: 145,
    helpful: true
  },
  {
    id: 10,
    name: "Nicole P.",
    age: 39,
    location: "Phoenix, AZ",
    story: "Tracking revealed I had a very short fertile window - only 1-2 days. At 39, we couldn't waste any cycles. Precise timing using ovulation tests and BBT helped us conceive naturally in 4 months!",
    outcome: "Natural conception at 39",
    avatar: "🎯",
    tags: ["Age 35+", "Short Fertile Window", "Precise Timing", "Success"],
    likes: 198,
    helpful: true
  }
]

const statistics = {
  totalUsers: 127500,
  successStories: 34200,
  averageTimeToConception: 7.2,
  userSatisfaction: 4.7
}

const commonChallenges = [
  {
    challenge: "Irregular Cycles",
    percentage: 32,
    description: "Users with PCOS, thyroid issues, or naturally irregular cycles",
    solutions: ["Extended tracking periods", "Ovulation prediction kits", "Medical consultation"]
  },
  {
    challenge: "Age-Related Decline",
    percentage: 24,
    description: "Women over 35 experiencing natural fertility decline",
    solutions: ["Earlier medical intervention", "Precise timing", "Lifestyle optimization"]
  },
  {
    challenge: "Male Factor Issues",
    percentage: 18,
    description: "Low sperm count, motility, or morphology issues",
    solutions: ["Lifestyle changes", "Medical treatment", "Assisted reproduction"]
  },
  {
    challenge: "Luteal Phase Defects",
    percentage: 15,
    description: "Short luteal phase affecting implantation",
    solutions: ["Progesterone supplementation", "Medical evaluation", "Cycle tracking"]
  },
  {
    challenge: "Unexplained Infertility",
    percentage: 11,
    description: "No identifiable cause found through testing",
    solutions: ["Comprehensive tracking", "Trial treatments", "Patience and persistence"]
  }
]

export default function UserStories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Real Stories, Real Success</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read inspiring stories from real women and couples who used fertility tracking to achieve their dreams of parenthood
          </p>
        </div>

        {/* Statistics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Community Impact</CardTitle>
            <CardDescription className="text-center">
              The power of fertility tracking in numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-pink-600">{statistics.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Baby className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{statistics.successStories.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">{statistics.averageTimeToConception}</div>
                <div className="text-sm text-gray-600">Avg. Months to Conception</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">{statistics.userSatisfaction}</div>
                <div className="text-sm text-gray-600">User Rating (5.0)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Success Stories</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {userStories.map((story) => (
              <Card key={story.id} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-3xl">{story.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{story.name}</h3>
                        <Badge variant="outline" className="text-xs">Age {story.age}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Quote className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-gray-700 leading-relaxed italic">"{story.story}"</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-green-600 text-sm">✨ {story.outcome}</div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-pink-500">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Challenges */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Overcoming Common Challenges</CardTitle>
            <CardDescription>
              Learn how others have successfully navigated fertility challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {commonChallenges.map((item, index) => (
                <div key={index} className="border-l-4 border-pink-500 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{item.challenge}</h3>
                    <Badge variant="outline">{item.percentage}% of users</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.solutions.map((solution, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Story</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your journey could inspire and help others facing similar challenges. 
              Share your fertility tracking experience and become part of our supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-pink-500 hover:bg-pink-600">
                Share My Story
              </Button>
              <Button variant="outline">
                Join Community Forum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 