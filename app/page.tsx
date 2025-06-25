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
  Menu,
  X,
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
      className={className}
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
      className="group"
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
              className="flex gap-6 group"
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
      className=""
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

  // Check if there's an initial value
  useEffect(() => {
    if (props.value) {
      setHasValue(props.value !== "")
    }
  }, [])

  return (
    <div className="relative w-full">
      <Input
        type={type}
        className={`w-full bg-white border-2 ${
          error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary"
        } rounded-xl sm:rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base peer placeholder-transparent transition-colors duration-200 text-gray-800 mt-2`}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value !== "")
        }}
        {...props}
      />
      <motion.label
        className={`absolute left-3 sm:left-4 pointer-events-none transition-all duration-200 bg-white px-1 ${
          error ? "text-red-500" : focused ? "text-primary" : "text-gray-500"
        }`}
        animate={{
          top: focused || hasValue ? "-0.6rem" : "0.85rem",
          fontSize: focused || hasValue ? "0.7rem" : "0.9rem",
        }}
        initial={{
          top: props.value ? "-0.6rem" : "0.85rem",
          fontSize: props.value ? "0.7rem" : "0.9rem",
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2 ml-1"
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
    mobile: "",
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
        mobile: "",
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
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-16 sm:w-20 h-16 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
        </motion.div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </p>
        <div className="flex items-center justify-center space-x-2 text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
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
            <FloatingLabelInput
              label="Your Mobile Number"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              error={errors.mobile}
              required
            />

          {/* <div className="grid md:grid-cols-2 gap-6">
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
          </div> */}

          <div className="relative">
            <Textarea
              placeholder="Tell us about your project... *"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`bg-white border-2 ${
                errors.message ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-primary"
              } rounded-2xl resize-none text-sm sm:text-base transition-colors duration-200 text-gray-800 w-full p-3 sm:p-4`}
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
            } text-white font-semibold py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group`}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
      {/* Optimized Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-transform">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-10 animate-float-slow" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-secondary-200 rounded-full blur-3xl opacity-8 animate-float-medium" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary-100 rounded-full blur-2xl opacity-12 animate-float-fast" />
      </div>


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
              className="flex items-center"
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
                  className="text-gray-700 hover:text-primary transition-colors font-medium relative group"
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
              <div className="flex space-x-4 ml-4">
                {/* <motion.a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </motion.a> */}
                <motion.a
                  href="https://www.linkedin.com/in/shrinav-digital-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://instagram.com/shrinav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm5.568 16.791c-.001.264-.106.52-.292.706-.187.187-.442.292-.706.292H7.239c-.264 0-.52-.105-.706-.292a.994.994 0 01-.292-.706V7.239c0-.264.106-.52.292-.706.187-.187.442-.292.706-.292h9.348c.264 0 .52.105.706.292.187.187.292.442.292.706v9.552z"/>
                    <path d="M12.017 7.075c-2.717 0-4.912 2.196-4.912 4.912s2.195 4.912 4.912 4.912 4.912-2.195 4.912-4.912-2.195-4.912-4.912-4.912zm0 8.072a3.16 3.16 0 01-3.16-3.16 3.16 3.16 0 013.16-3.16 3.16 3.16 0 013.16 3.16 3.16 3.16 0 01-3.16 3.16zM17.156 6.924c0 .22-.071.433-.2.6a.901.901 0 01-.6.2.901.901 0 01-.6-.2.901.901 0 01-.2-.6c0-.22.071-.433.2-.6a.901.901 0 01.6-.2c.22 0 .433.071.6.2.129.167.2.38.2.6z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="mailto:shrinavjee@gmail.com"
                  className="text-gray-600 hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>

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
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {["About", "Services", "Projects", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/shrinav-digital-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/shrinav" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm5.568 16.791c-.001.264-.106.52-.292.706-.187.187-.442.292-.706.292H7.239c-.264 0-.52-.105-.706-.292a.994.994 0 01-.292-.706V7.239c0-.264.106-.52.292-.706.187-.187.442-.292.706-.292h9.348c.264 0 .52.105.706.292.187.187.292.442.292.706v9.552z"/>
                      <path d="M12.017 7.075c-2.717 0-4.912 2.196-4.912 4.912s2.195 4.912 4.912 4.912 4.912-2.195 4.912-4.912-2.195-4.912-4.912-4.912zm0 8.072a3.16 3.16 0 01-3.16-3.16 3.16 3.16 0 013.16-3.16 3.16 3.16 0 013.16 3.16 3.16 3.16 0 01-3.16 3.16zM17.156 6.924c0 .22-.071.433-.2.6a.901.901 0 01-.6.2.901.901 0 01-.6-.2.901.901 0 01-.2-.6c0-.22.071-.433.2-.6a.901.901 0 01.6-.2c.22 0 .433.071.6.2.129.167.2.38.2.6z"/>
                    </svg>
                  </a>
                  <a href="mailto:hello@shrinav.com" className="text-gray-600 hover:text-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
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
              <span className="block text-gray-900">Where Imagination</span>
              <span className="block bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">
                Meets Innovation
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
              {/* <MagneticButton className="bg-primary flex hover:bg-primary-dark text-white font-semibold px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-primary/25 transition-all duration-300 group w-full sm:w-auto">
                <Rocket className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform duration-300 " />
                View Projects
              </MagneticButton> */}

              <Link href="#project" className="w-full sm:w-auto">
                <MagneticButton className="bg-primary border-2 flex justify-center border-primary text-white hover:bg-primary hover:text-white font-semibold px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-lg group transition-all duration-300 w-full">
                <Rocket className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform duration-300 " />
                  View Projects
                </MagneticButton>
              </Link>

              <Link href="#contact" className="w-full sm:w-auto">
                <MagneticButton className="border-2 flex justify-center border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-lg group transition-all duration-300 w-full">
                  <Calendar className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                  Contact Us
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Service Categories */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { title: "Web Development", icon: Code, gradient: "from-lime-400 to-green-500" },
                { title: "App Development", icon: Smartphone, gradient: "from-blue-400 to-cyan-500" },
                { title: "Digital Marketing", icon: TrendingUp, gradient: "from-purple-400 to-pink-500" },
                { title: "Custom Software", icon: Zap, gradient: "from-orange-400 to-red-500" },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="p-6 relative">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ScrollFollowingElement />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-white relative">
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
        <div className="container mx-auto px-6 py-16">
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
      <section ref={testimonialsRef} className="py-20 bg-white relative">
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
      <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 ">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-md mb-6">Get In Touch</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Start
              <span className="block text-primary">Your Project?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Let's discuss your vision and create something extraordinary together. We're here to turn your ideas into
              digital reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Card className="border-0 bg-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardContent className="p-6 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Send us a message</h3>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-12"
            >
              {/* Let's Connect Section */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Let's connect</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: "shrinavjee@gmail.com", href: "mailto:shrinavjee@gmail.com", label: "Email Us" },
                    { icon: Phone, text: "+917698563522", href: "tel:+917698563522", label: "Call Us" },
                    { icon: Phone, text: "+919016771335", href: "tel:+919016771335", label: "Call Us" },
                    { icon: MapPin, text: "Red Dear, Canada", href: "#", label: "Visit Us" },
                    { icon: MapPin, text: "New York, USA", href: "#", label: "Visit Us (US)" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-primary transition-colors group"
                      initial={{ opacity: 0, x: 50 }}
                      animate={contactInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary-100 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-base sm:text-lg">{item.label}</div>
                        <div className="text-gray-600 text-sm sm:text-base">{item.text}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Follow Our Journey Section */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-8">Follow our journey</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "WhatsApp", href: "https://wa.me/+919016771335", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg> },
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/shrinav-digital-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { name: "Facebook", href: "https://facebook.com/shrinav", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    { name: "Instagram", href: "https://www.instagram.com/shrinav._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm5.568 16.791c-.001.264-.106.52-.292.706-.187.187-.442.292-.706.292H7.239c-.264 0-.52-.105-.706-.292a.994.994 0 01-.292-.706V7.239c0-.264.106-.52.292-.706.187-.187.442-.292.706-.292h9.348c.264 0 .52.105.706.292.187.187.292.442.292.706v9.552z"/><path d="M12.017 7.075c-2.717 0-4.912 2.196-4.912 4.912s2.195 4.912 4.912 4.912 4.912-2.195 4.912-4.912-2.195-4.912-4.912-4.912zm0 8.072a3.16 3.16 0 01-3.16-3.16 3.16 3.16 0 013.16-3.16 3.16 3.16 0 013.16 3.16 3.16 3.16 0 01-3.16 3.16zM17.156 6.924c0 .22-.071.433-.2.6a.901.901 0 01-.6.2.901.901 0 01-.6-.2.901.901 0 01-.2-.6c0-.22.071-.433.2-.6a.901.901 0 01.6-.2c.22 0 .433.071.6.2.129.167.2.38.2.6z"/></svg> },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-primary-100 rounded-2xl text-primary hover:text-white hover:bg-primary transition-all duration-300 group"
                      initial={{ opacity: 0, y: 50 }}
                      animate={contactInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="mr-3 group-hover:scale-110 transition-transform duration-300">{social.svg}</div>
                      <span className="font-semibold">{social.name}</span>
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
                Where Imagination Meets Innovation stories. We create exceptional experiences that drive growth and
                inspire innovation.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "WhatsApp", href: "https://wa.me/+919016771335", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg> },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/shrinav-digital-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { name: "Facebook", href: "https://facebook.com/shrinav", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                  { name: "Instagram", href: "https://www.instagram.com/shrinav._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm5.568 16.791c-.001.264-.106.52-.292.706-.187.187-.442.292-.706.292H7.239c-.264 0-.52-.105-.706-.292a.994.994 0 01-.292-.706V7.239c0-.264.106-.52.292-.706.187-.187.442-.292.706-.292h9.348c.264 0 .52.105.706.292.187.187.292.442.292.706v9.552z"/><path d="M12.017 7.075c-2.717 0-4.912 2.196-4.912 4.912s2.195 4.912 4.912 4.912 4.912-2.195 4.912-4.912-2.195-4.912-4.912-4.912zm0 8.072a3.16 3.16 0 01-3.16-3.16 3.16 3.16 0 013.16-3.16 3.16 3.16 0 013.16 3.16 3.16 3.16 0 01-3.16 3.16zM17.156 6.924c0 .22-.071.433-.2.6a.901.901 0 01-.6.2.901.901 0 01-.6-.2.901.901 0 01-.2-.6c0-.22.071-.433.2-.6a.901.901 0 01.6-.2c.22 0 .433.071.6.2.129.167.2.38.2.6z"/></svg> },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <div className="scale-75">{social.svg}</div>
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Services</h5>
              <ul className="space-y-3 text-gray-400">
                {["Web Development", "App Development", "Digital Marketing", "Branding & Design"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Company</h5>
              <ul className="space-y-3 text-gray-400">
                {["About Us", "Services", "Projects", "Blog"].map((item) => (
                  <li key={item}>
                    <Link href={"#"+item.toLowerCase()} className="hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Contact</h5>
              <ul className="space-y-3 text-gray-400">
                <li>shrinavjee@gmail.com</li>
                <li>+917698563522</li>
                {/* <li></li> */}
                <li>Ahmedabad, Gujarat</li>
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
