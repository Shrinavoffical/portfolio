"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useData } from "../hooks/useData"
import { getIcon } from "./IconComponents"
import { Badge, Card, CardContent, Input, Textarea } from "./UIComponents"
import HorizontalScrollProjects from "./HorizontalScrollProjects"

// Custom Cursor Component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 700 })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let rafId

    const moveCursor = (e) => {
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
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-lime-400 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ scale: { duration: 0.2 } }}
    />
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className = "", onClick, ...props }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e) => {
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
      onClick={onClick}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`cursor-hover ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = getIcon(service.icon)

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
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
          />

          <motion.div
            className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">{service.description}</p>

          <div className="space-y-3 mb-6">
            {service.features.map((feature, idx) => {
              const CheckIcon = getIcon("check-circle")
              return (
                <motion.div
                  key={feature}
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
                >
                  <CheckIcon className="h-5 w-5 text-lime-500 mr-3 flex-shrink-0" />
                  {feature}
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  const rotation = index % 2 === 0 ? 2 : -2
  const StarIcon = getIcon("star")

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
              <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <p className="text-gray-600 mb-8 italic leading-relaxed text-lg">"{testimonial.content}"</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-15 h-15 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
                <div className="text-lime-600 text-sm font-semibold">{testimonial.company}</div>
              </div>
            </div>

            <img
              src={testimonial.logo || "/placeholder.svg"}
              alt={`${testimonial.company} logo`}
              className="w-20 h-8 opacity-60"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Contact Form Component
const ContactForm = ({ data }) => {
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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)

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

  const SendIcon = getIcon("send")
  const CheckIcon = getIcon("check-circle")
  const ChevronDownIcon = getIcon("chevron-down")

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-white shadow-2xl rounded-3xl">
        <CardContent className="p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckIcon className="h-10 w-10 text-lime-600" />
          </motion.div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600 text-lg mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <div className="flex items-center justify-center space-x-2 text-lime-600">
            <div className="w-2 h-2 bg-lime-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-lime-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-lime-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
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
            <div className="relative">
              <Input
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`bg-white border-2 ${
                  errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
                } rounded-2xl py-4 px-4 text-base transition-colors duration-200`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-2 ml-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <Input
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`bg-white border-2 ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
                } rounded-2xl py-4 px-4 text-base transition-colors duration-200`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2 ml-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <select
                value={formData.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
                className={`w-full bg-white border-2 ${
                  errors.projectType ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
                } rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer`}
              >
                <option value="">Select Project Type *</option>
                {data?.services?.map((service) => (
                  <option key={service.id} value={service.title.toLowerCase().replace(" ", "-")}>
                    {service.title}
                  </option>
                ))}
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              {errors.projectType && <p className="text-red-500 text-sm mt-2 ml-1">{errors.projectType}</p>}
            </div>

            <div className="relative">
              <select
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer"
              >
                <option value="">Budget Range (Optional)</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <Textarea
              placeholder="Tell us about your project... *"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`bg-white border-2 ${
                errors.message ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
              } rounded-2xl resize-none text-base transition-colors duration-200`}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">{formData.message.length}/500</div>
            {errors.message && <p className="text-red-500 text-sm mt-2 ml-1">{errors.message}</p>}
          </div>

          <MagneticButton
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-lime-500 hover:bg-lime-600"
            } text-white font-semibold py-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-lime-500/25 transition-all duration-300 group`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sending Message...
              </>
            ) : (
              <div className="flex items-center justify-center">
                Send Message
                <SendIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
          </MagneticButton>
        </form>
      </CardContent>
    </Card>
  )
}

// Main HomePage Component
const HomePage = () => {
  const { data, loading } = useData()
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

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-500"></div>
      </div>
    )
  }

  const RocketIcon = getIcon("rocket")
  const PlayIcon = getIcon("play")
  const ChevronDownIcon = getIcon("chevron-down")
  const MailIcon = getIcon("mail")
  const PhoneIcon = getIcon("phone")
  const MapPinIcon = getIcon("map-pin")
  const MessageCircleIcon = getIcon("message-circle")
  const UsersIcon = getIcon("users")
  const PaletteIcon = getIcon("palette")
  const GlobeIcon = getIcon("globe")

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative cursor-none">
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
              className="text-3xl font-bold tracking-tight cursor-hover"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-lime-500">{data.company.name.slice(0, 3)}</span>
              <span className="text-gray-900">{data.company.name.slice(3)}</span>
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {data.navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-lime-500 transition-colors font-medium relative group cursor-hover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MagneticButton
                className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-lime-500/25 transition-all duration-300"
                onClick={() => (window.location.href = "/start-project")}
              >
                Get Started
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="bg-lime-100 text-lime-700 px-6 py-3 rounded-full text-base font-semibold">
                🚀 {data.company.tagline}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block text-gray-900">Transforming Ideas Into</span>
              <span className="block bg-gradient-to-r from-lime-400 via-lime-500 to-green-500 bg-clip-text text-transparent">
                Digital Success
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {data.company.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton
                className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-10 py-5 text-lg rounded-2xl shadow-xl hover:shadow-lime-500/25 transition-all duration-300 group"
                onClick={() => (window.location.href = "/start-project")}
              >
                <RocketIcon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Start Your Project
              </MagneticButton>

              <MagneticButton
                className="border-2 border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white font-semibold px-10 py-5 text-lg rounded-2xl shadow-lg group transition-all duration-300"
                onClick={() => (window.location.href = "/start-project")}
              >
                <PlayIcon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Our Story
              </MagneticButton>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {data.company.stats.map((stat, index) => {
                const StatIcon = getIcon(stat.icon)
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-hover"
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <StatIcon className="h-8 w-8 text-lime-500 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-lime-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-hover"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ChevronDownIcon className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <Badge className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm">About Our Process</Badge>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                How We Create
                <span className="block text-lime-500">Digital Magic</span>
              </h2>

              <div className="space-y-12">
                {data.aboutProcess.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex gap-6 group cursor-hover"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="lg:sticky lg:top-32 relative z-10">
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <img
                  src="/placeholder.svg?height=700&width=600"
                  alt="Our Process Visualization"
                  className="rounded-[3rem] relative z-10 shadow-2xl w-full"
                />
              </motion.div>
            </div>
          </div>
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
            <Badge className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm mb-6">Our Services</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Comprehensive Digital
              <span className="block text-lime-500">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From concept to launch, we provide end-to-end digital services that drive growth and deliver exceptional
              user experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" ref={projectsRef}>
        <div className="container mx-auto px-6 py-20">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm mb-6">Featured Work</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Projects That
              <span className="block text-lime-500">Drive Results</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses transform their digital presence and achieve remarkable growth.
            </p>
          </motion.div>
        </div>

        <HorizontalScrollProjects data={data} />
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
            <Badge className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm mb-6">
              Client Success Stories
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              What Our
              <span className="block text-lime-500">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it—hear from the businesses we've helped transform and grow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm mb-6">Get In Touch</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Start
              <span className="block text-lime-500">Your Project?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your vision and create something extraordinary together. We're here to turn your ideas into
              digital reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <ContactForm data={data} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Let's connect</h3>
                <div className="space-y-6">
                  <motion.a
                    href={`mailto:${data.company.contact.email}`}
                    className="flex items-center text-gray-600 hover:text-lime-600 transition-colors group cursor-hover"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-lime-200 group-hover:scale-110 transition-all duration-300">
                      <MailIcon className="h-8 w-8 text-lime-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Email Us</div>
                      <div className="text-gray-600">{data.company.contact.email}</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`tel:${data.company.contact.phone}`}
                    className="flex items-center text-gray-600 hover:text-lime-600 transition-colors group cursor-hover"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-lime-200 group-hover:scale-110 transition-all duration-300">
                      <PhoneIcon className="h-8 w-8 text-lime-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Call Us</div>
                      <div className="text-gray-600">{data.company.contact.phone}</div>
                    </div>
                  </motion.a>

                  <motion.div
                    className="flex items-center text-gray-600 hover:text-lime-600 transition-colors group cursor-hover"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-lime-200 group-hover:scale-110 transition-all duration-300">
                      <MapPinIcon className="h-8 w-8 text-lime-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Visit Us</div>
                      <div className="text-gray-600">{data.company.contact.address}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Follow our journey</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "WhatsApp",
                      icon: MessageCircleIcon,
                      color: "hover:bg-green-500",
                      href: data.company.contact.socialLinks.whatsapp,
                    },
                    {
                      name: "LinkedIn",
                      icon: UsersIcon,
                      color: "hover:bg-blue-600",
                      href: data.company.contact.socialLinks.linkedin,
                    },
                    {
                      name: "Instagram",
                      icon: PaletteIcon,
                      color: "hover:bg-pink-500",
                      href: data.company.contact.socialLinks.instagram,
                    },
                    {
                      name: "Facebook",
                      icon: GlobeIcon,
                      color: "hover:bg-blue-500",
                      href: data.company.contact.socialLinks.facebook,
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center text-lime-600 hover:text-white transition-all duration-300 cursor-hover ${social.color}`}
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
                <span className="text-lime-400">{data.company.name.slice(0, 3)}</span>
                <span className="text-white">{data.company.name.slice(3)}</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">{data.footer.description}</p>
              <div className="flex space-x-4">
                {[MessageCircleIcon, UsersIcon, PaletteIcon, GlobeIcon].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-gray-700 transition-all duration-300 cursor-hover"
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
                {data.footer.sections.services.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-lime-400 transition-colors cursor-hover">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Company</h5>
              <ul className="space-y-3 text-gray-400">
                {data.footer.sections.company.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-lime-400 transition-colors cursor-hover">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Contact</h5>
              <ul className="space-y-3 text-gray-400">
                <li>{data.company.contact.email}</li>
                <li>{data.company.contact.phone}</li>
                <li>{data.company.contact.address}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>{data.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
