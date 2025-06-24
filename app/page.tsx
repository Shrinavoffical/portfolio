"use client"

import type React from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Smartphone,
  TrendingUp,
  Palette,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Star,
  Play,
  CheckCircle,
  Zap,
  Award,
  Globe,
  Users,
  ChevronDown,
  Rocket,
  Heart,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState, useCallback } from "react"
import HorizontalScrollProjects from "@/components/HorizontalScrollProjects"
import siteData from "@/data/siteData.json"

// Enhanced service data with better descriptions
const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
    features: ["React & Next.js", "TypeScript", "Performance Optimized", "SEO Ready"],
    gradient: "from-lime-400 to-green-500",
    hoverColor: "hover:bg-lime-50",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Ready"],
    gradient: "from-blue-400 to-cyan-500",
    hoverColor: "hover:bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that boost your online presence and drive measurable business growth.",
    features: ["SEO & SEM", "Social Media", "Analytics", "Growth Hacking"],
    gradient: "from-purple-400 to-pink-500",
    hoverColor: "hover:bg-purple-50",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored software solutions built from scratch to meet your unique business requirements and scale with your growth.",
    features: ["Enterprise Solutions", "API Development", "Database Design", "System Integration"],
    gradient: "from-orange-400 to-red-500",
    hoverColor: "hover:bg-orange-50",
  },
]

// Enhanced testimonials with company logos
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content:
      "Shrinav transformed our vision into reality with exceptional attention to detail. Their team delivered a world-class product that exceeded all our expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "GrowthLab",
    content:
      "The expertise in both design and development is unmatched. They delivered a scalable solution that helped us achieve 300% growth in just 6 months.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "InnovateCorp",
    content:
      "Working with Shrinav was transformative. Their technical skills and creative approach helped us launch faster and more successfully than we imagined.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
]

// Custom Cursor Component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 700 })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let rafId: number

    const moveCursor = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 8)
        cursorY.set(e.clientY - 8)
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      if (rafId) cancelAnimationFrame(rafId)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
    </>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const rect = ref.current.getBoundingClientRect()
    const { height, width, left, top } = rect
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }, [])

  const reset = useCallback(() => setPosition({ x: 0, y: 0 }), [])

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`cursor-hover ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}



// Service Card Component with Enhanced Animations
const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:rotate-1 rounded-3xl overflow-hidden ${service.hoverColor}`}
      >
        <CardContent className="p-8 relative">
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
          />

          <motion.div
            className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <service.icon className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">{service.description}</p>

          <div className="space-y-3 mb-6">
            {service.features.map((feature: string, idx: number) => (
              <motion.div
                key={feature}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
              >
                <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                {feature}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Scroll-Following Element Component
const ScrollFollowingElement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="section__content container grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      {/* Left side - scrolling content */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm sm:text-lg">About Our Process</Badge>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
          How We Create
          <span className="block text-primary">Digital Magic</span>
        </h2>

        <div className="space-y-12">
          {[
            {
              step: "01",
              title: "Discovery & Strategy",
              description:
                "We dive deep into understanding your business goals, target audience, and market landscape to create a comprehensive strategy.",
            },
            {
              step: "02",
              title: "Design & Prototyping",
              description:
                "Our design team creates stunning visuals and interactive prototypes that bring your vision to life with pixel-perfect precision.",
            },
            {
              step: "03",
              title: "Development & Testing",
              description:
                "Using cutting-edge technologies, we build robust, scalable solutions with rigorous testing to ensure flawless performance.",
            },
            {
              step: "04",
              title: "Launch & Optimization",
              description:
                "We deploy your project with careful monitoring and continuous optimization to maximize performance and user satisfaction.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex gap-6 group cursor-hover"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary-dark rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right side - sticky following element */}
      <div className="lg:sticky lg:top-32 relative z-10">
        <motion.div
          ref={imageRef}
          style={{ y }}
          className="relative z-20"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-[3rem] transform rotate-3 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-[3rem] transform -rotate-2 scale-105" />
            <Image
              src="/placeholder.svg?height=700&width=600"
              alt="Our Process Visualization"
              width={600}
              height={700}
              className="rounded-[3rem] relative z-10 shadow-2xl w-full"
            />
          </div>

          {/* Floating stats */}
          {/* <motion.div
            className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            <div className="text-2xl font-bold text-primary">48h</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  )
}

// Testimonial Card with Rotation
const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const rotation = index % 2 === 0 ? 2 : -2

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="cursor-hover"
    >
      <Card className="h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 rounded-3xl overflow-hidden max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="flex mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <p className="text-gray-600 mb-8 italic leading-relaxed text-lg">"{testimonial.content}"</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
                <div className="text-primary text-sm font-semibold">{testimonial.company}</div>
              </div>
            </div>

            <Image
              src={testimonial.logo || "/placeholder.svg"}
              alt={`${testimonial.company} logo`}
              width={80}
              height={30}
              className="opacity-60"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Floating Label Input with validation
const FloatingLabelInput = ({ label, type = "text", error, required = false, ...props }: any) => {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <Input
        type={type}
        className={`bg-white border-2 ${
          error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary"
        } rounded-2xl py-4 px-4 text-base peer placeholder-transparent transition-colors duration-200`}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value !== "")
        }}
        {...props}
      />
      <motion.label
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          error ? "text-red-500" : focused ? "text-primary" : "text-gray-500"
        }`}
        animate={{
          top: focused || hasValue ? "0.5rem" : "1rem",
          fontSize: focused || hasValue ? "0.75rem" : "1rem",
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Enhanced Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-white shadow-2xl rounded-3xl">
        <CardContent className="p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-primary" />
          </motion.div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600 text-lg mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white shadow-2xl rounded-3xl">
      <CardContent className="p-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <FloatingLabelInput
              label="Your Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              required
            />
            <FloatingLabelInput
              label="Your Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <select
                value={formData.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
                className={`w-full bg-white border-2 ${
                  errors.projectType ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary"
                } rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer`}
              >
                <option value="">Select Project Type *</option>
                <option value="web-development">Web Development</option>
                <option value="app-development">App Development</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="branding-design">Branding & Design</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              {errors.projectType && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1"
                >
                  {errors.projectType}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <select
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 focus:border-primary rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer"
              >
                <option value="">Budget Range (Optional)</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <Textarea
              placeholder="Tell us about your project... *"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`bg-white border-2 ${
                errors.message ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary"
              } rounded-2xl resize-none text-base transition-colors duration-200`}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">{formData.message.length}/500</div>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2 ml-1"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          <MagneticButton
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
            } text-white font-semibold py-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sending Message...
              </>
            ) : (
              <div className="flex items-center justify-center">
                Send Message
                <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
          </MagneticButton>
        </form>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative cursor-none">
      {/* Optimized Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-transform">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-10 animate-float-slow" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-secondary-200 rounded-full blur-3xl opacity-8 animate-float-medium" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary-100 rounded-full blur-2xl opacity-12 animate-float-fast" />
      </div>
      
      <CustomCursor />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center cursor-hover"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src="https://darshan9121.github.io/Shrinav_official/assets/logo-DoN5Yaxp.jpg"
                alt="Shrinav Logo"
                width={40}
                height={40}
                className="rounded-lg mr-3"
              />
              <div className="text-3xl font-bold tracking-tight">
                <span className="text-primary">Shrinav</span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["About", "Services", "Projects", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary transition-colors font-medium relative group cursor-hover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              
              {/* Social Links */}
              <div className="flex space-x-2 ml-4">
                <motion.a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-hover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/shrinav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-hover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Users className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Mobile Get Started Button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 text-sm rounded-xl shadow-lg transition-all duration-300">
                Get Started
              </MagneticButton>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/start-project">
                <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                  
                </MagneticButton>
              </Link>
            </motion.div> */}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">


        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >


            <motion.h1
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block text-gray-900">Transforming Ideas Into</span>
              <span className="block bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">
                Digital Success
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We craft exceptional digital experiences that drive growth, engage audiences, and deliver measurable
              results for forward-thinking businesses.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton className="bg-primary flex hover:bg-primary-dark text-white font-semibold px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-primary/25 transition-all duration-300 group w-full sm:w-auto">
                <Rocket className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                Start Your Project
              </MagneticButton>

              <Link href="#contact" className="w-full sm:w-auto">
                <MagneticButton className="border-2 flex justify-center border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-lg group transition-all duration-300 w-full">
                  <Calendar className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                  Contact Us
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { number: "150+", label: "Projects Delivered", icon: Rocket },
                { number: "50+", label: "Happy Clients", icon: Heart },
                { number: "7+", label: "Projects in Progress", icon: Award },
                { number: "99.9%", label: "Client Satisfaction", icon: Zap },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-hover"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section with Scroll-Following Element */}
      <section
        id="about"
        ref={aboutRef}
        className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ScrollFollowingElement />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-lg mb-6">Our Services</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Comprehensive Digital
              <span className="block text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From concept to launch, we provide end-to-end digital services that drive growth and deliver exceptional
              user experiences.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section with GSAP Horizontal Scroll */}
      <section id="projects" ref={projectsRef} className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-lg mb-6">Featured Work</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Projects That
              <span className="block text-primary">Drive Results</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses transform their digital presence and achieve remarkable growth.
            </p>
          </motion.div>
        </div>

        <HorizontalScrollProjects data={siteData} />
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-lg mb-6">
              Client Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
              What Our
              <span className="block text-primary">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it—hear from the businesses we've helped transform and grow.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm mb-6">Get In Touch</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Start
              <span className="block text-primary">Your Project?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your vision and create something extraordinary together. We're here to turn your ideas into
              digital reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 md:px-40 gap-20 max-w-full mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >

              <ContactForm />
              
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Let's connect</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, text: "hello@shrinav.com", href: "mailto:hello@shrinav.com", label: "Email Us" },
                    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567", label: "Call Us" },
                    { icon: MapPin, text: "123 Innovation Street, Tech City", href: "#", label: "Visit Us" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-primary transition-colors group cursor-hover"
                      initial={{ opacity: 0, x: 50 }}
                      animate={contactInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{item.label}</div>
                        <div className="text-gray-600">{item.text}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Follow our journey</h4>
                <div className="flex space-x-4">
                  {[
                    { name: "WhatsApp", icon: MessageCircle, color: "hover:bg-primary", href: "#" },
                    { name: "LinkedIn", icon: Users, color: "hover:bg-primary", href: "#" },
                    { name: "Instagram", icon: Palette, color: "hover:bg-primary", href: "#" },
                    { name: "Facebook", icon: Globe, color: "hover:bg-primary", href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary hover:text-white transition-all duration-300 cursor-hover ${social.color}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={contactInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-8 w-8" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-4xl font-bold mb-6">
                <span className="text-primary">Shrinav</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming ideas into digital success stories. We create exceptional experiences that drive growth and
                inspire innovation.
              </p>
              <div className="flex space-x-4">
                {[MessageCircle, Users, Palette, Globe].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300 cursor-hover"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Services</h5>
              <ul className="space-y-3 text-gray-400">
                {["Web Development", "App Development", "Digital Marketing", "Branding & Design"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors cursor-hover">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Company</h5>
              <ul className="space-y-3 text-gray-400">
                {["About Us", "Our Team", "Careers", "Blog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors cursor-hover">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Contact</h5>
              <ul className="space-y-3 text-gray-400">
                <li>hello@shrinav.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Innovation Street</li>
                <li>Tech City, TC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shrinav. All rights reserved. Crafted with ❤️ for amazing businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
