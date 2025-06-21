"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  Zap,
  Target,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

// Enhanced project data with detailed case studies
const projectsData = {
  1: {
    id: 1,
    title: "FinTech Revolution",
    category: "Web Application",
    client: "FinanceFlow Inc.",
    duration: "8 months",
    team: "6 developers",
    year: "2024",
    status: "Live",
    description:
      "A comprehensive financial platform with real-time analytics, automated trading, and AI-powered insights that transformed how users manage their investments.",
    challenge:
      "FinanceFlow needed a modern, secure platform to compete with established financial institutions while providing advanced analytics and automated trading capabilities for both novice and expert investors.",
    solution:
      "We developed a comprehensive fintech platform with real-time market data, AI-powered investment recommendations, automated portfolio rebalancing, and advanced security features including multi-factor authentication and end-to-end encryption.",
    results: [
      "300% increase in user engagement",
      "50,000+ active users within 6 months",
      "99.9% uptime reliability",
      "$2M+ in managed assets",
      "4.9/5 user satisfaction rating",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "AI/ML", "WebSocket", "Stripe", "AWS"],
    features: [
      "Real-time market data integration",
      "AI-powered investment recommendations",
      "Automated portfolio rebalancing",
      "Advanced charting and analytics",
      "Multi-factor authentication",
      "Mobile-responsive design",
      "API integrations with major exchanges",
      "Compliance with financial regulations",
    ],
    images: {
      hero: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    testimonial: {
      quote:
        "Shrinav delivered beyond our expectations. The platform is not only beautiful but incredibly robust and secure. Our users love the intuitive interface and powerful features.",
      author: "Sarah Johnson",
      role: "CEO, FinanceFlow Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    metrics: {
      users: "50K+",
      growth: "300%",
      rating: "4.9",
      uptime: "99.9%",
    },
    liveUrl: "https://financeflow.demo",
    githubUrl: "https://github.com/shrinav/fintech-platform",
    color: "lime",
    bgGradient: "from-lime-100 to-green-100",
  },
  2: {
    id: 2,
    title: "E-Commerce Empire",
    category: "Mobile Application",
    client: "ShopSmart Ltd.",
    duration: "10 months",
    team: "8 developers",
    year: "2024",
    status: "Live",
    description:
      "Multi-vendor marketplace with advanced recommendation engine and seamless payment integration that increased sales by 250%.",
    challenge:
      "ShopSmart needed a scalable mobile marketplace that could handle thousands of vendors while providing personalized shopping experiences and seamless payment processing.",
    solution:
      "We built a comprehensive mobile marketplace with AI-powered recommendations, multi-vendor management, real-time inventory tracking, and integrated payment solutions supporting multiple currencies and payment methods.",
    results: [
      "250% increase in sales",
      "100,000+ active users",
      "500+ registered vendors",
      "4.8/5 app store rating",
      "40% increase in user retention",
    ],
    technologies: ["React Native", "Node.js", "MongoDB", "Redis", "Stripe", "PayPal", "Firebase", "AWS"],
    features: [
      "Multi-vendor marketplace",
      "AI-powered product recommendations",
      "Real-time inventory management",
      "Multiple payment gateways",
      "Push notifications",
      "Advanced search and filtering",
      "Vendor analytics dashboard",
      "Customer support chat",
    ],
    images: {
      hero: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    testimonial: {
      quote:
        "The mobile app exceeded all our expectations. The user experience is seamless, and our vendors love the comprehensive dashboard. Sales have skyrocketed since launch.",
      author: "Michael Chen",
      role: "CTO, ShopSmart Ltd.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    metrics: {
      users: "100K+",
      growth: "250%",
      rating: "4.8",
      vendors: "500+",
    },
    liveUrl: "https://shopsmart.demo",
    githubUrl: "https://github.com/shrinav/ecommerce-app",
    color: "blue",
    bgGradient: "from-blue-100 to-cyan-100",
  },
  // Add more projects as needed...
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  const project = projectsData[params.id as string]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="bg-lime-500 hover:bg-lime-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-lime-500">Shri</span>
              <span className="text-gray-900">nav</span>
            </Link>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <motion.div className="container mx-auto px-6" style={{ y: heroY }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge
                className={`bg-${project.color}-100 text-${project.color}-700 px-4 py-2 rounded-full text-sm mb-6`}
              >
                {project.category}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{project.title}</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  {project.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  {project.team}
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2" />
                  {project.year}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </Button>
                <Button variant="outline" className="border-gray-300 px-8 py-3">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} rounded-3xl transform rotate-3 scale-105`}
              />
              <Image
                src={project.images.hero || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="relative z-10 rounded-3xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(project.metrics).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-50 p-6 rounded-2xl"
              >
                <div className="text-3xl font-bold text-lime-600 mb-2">{value}</div>
                <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-red-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-lime-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive functionality designed to deliver exceptional user experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <CheckCircle className="h-6 w-6 text-lime-500 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technologies chosen for optimal performance and scalability
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 bg-white rounded-full shadow-md text-gray-700 font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="h-8 w-8 text-lime-500 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Results & Impact</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable outcomes that demonstrate the success of our solution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-lime-50 to-green-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <TrendingUp className="h-8 w-8 text-lime-600 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold text-lg">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="border-0 bg-white shadow-2xl rounded-3xl p-12">
              <CardContent className="p-0">
                <div className="text-6xl text-lime-500 mb-6">"</div>
                <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">{project.testimonial.quote}</p>
                <div className="flex items-center justify-center">
                  <Image
                    src={project.testimonial.avatar || "/placeholder.svg"}
                    alt={project.testimonial.author}
                    width={80}
                    height={80}
                    className="rounded-full mr-6"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-xl">{project.testimonial.author}</div>
                    <div className="text-gray-600">{project.testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lime-500">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-lime-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your ideas into digital success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-lime-600 hover:bg-gray-100 px-8 py-3 text-lg">Start Your Project</Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-lime-600 px-8 py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                View More Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
