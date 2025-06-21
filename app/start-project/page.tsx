"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Users,
  Palette,
  Globe,
  CheckCircle,
  Rocket,
  Target,
  Zap,
  User,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Enhanced Floating Label Input with validation
const FloatingLabelInput = ({ label, type = "text", error, required = false, ...props }: any) => {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <Input
        type={type}
        className={`bg-white border-2 ${
          error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
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
          error ? "text-red-500" : focused ? "text-lime-600" : "text-gray-500"
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

// Project Inquiry Form Component
const ProjectInquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    goals: "",
    targetAudience: "",
    inspiration: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Please provide more details (minimum 20 characters)"
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

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
        goals: "",
        targetAudience: "",
        inspiration: "",
      })
    }, 5000)
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
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="h-12 w-12 text-lime-600" />
          </motion.div>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Project Inquiry Received!</h3>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed">
            Thank you for your detailed project information. Our team will review your requirements and get back to you
            within 24 hours with a comprehensive proposal.
          </p>
          <div className="bg-lime-50 p-6 rounded-2xl mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">What happens next?</h4>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </div>
                <span className="text-gray-700">We'll review your project requirements</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </div>
                <span className="text-gray-700">Schedule a discovery call within 24 hours</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </div>
                <span className="text-gray-700">Provide a detailed proposal and timeline</span>
              </div>
            </div>
          </div>
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
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your project</h3>
          <p className="text-gray-600 text-lg">
            The more details you provide, the better we can understand your needs and create the perfect solution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-lime-600" />
              Personal Information
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <FloatingLabelInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
                required
              />
              <FloatingLabelInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <FloatingLabelInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                required
              />
              <FloatingLabelInput
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
              />
            </div>
            <div className="mt-6">
              <FloatingLabelInput
                label="Company/Organization"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                error={errors.company}
              />
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Rocket className="h-5 w-5 mr-2 text-lime-600" />
              Project Details
            </h4>
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
                  <option value="web-development">Web Development</option>
                  <option value="app-development">Mobile App Development</option>
                  <option value="ecommerce">E-Commerce Platform</option>
                  <option value="saas">SaaS Application</option>
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
                  className="w-full bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Budget Range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                  <option value="discuss">Let's discuss</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <select
                  value={formData.timeline}
                  onChange={(e) => handleChange("timeline", e.target.value)}
                  className="w-full bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl py-4 px-4 text-base transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Project Timeline</option>
                  <option value="asap">ASAP (Rush project)</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6-12months">6-12 months</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-lime-600" />
              Project Description
            </h4>
            <div className="relative mb-6">
              <Textarea
                placeholder="Describe your project in detail. What are you looking to build? What problems are you trying to solve? *"
                rows={6}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`bg-white border-2 ${
                  errors.description ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-lime-500"
                } rounded-2xl resize-none text-base transition-colors duration-200`}
                maxLength={1000}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">{formData.description.length}/1000</div>
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1"
                >
                  {errors.description}
                </motion.p>
              )}
            </div>

            <div className="relative mb-6">
              <Textarea
                placeholder="What are your main goals and objectives for this project?"
                rows={4}
                value={formData.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
                className="bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl resize-none text-base transition-colors duration-200"
                maxLength={500}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">{formData.goals.length}/500</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Textarea
                  placeholder="Who is your target audience?"
                  rows={3}
                  value={formData.targetAudience}
                  onChange={(e) => handleChange("targetAudience", e.target.value)}
                  className="bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl resize-none text-base transition-colors duration-200"
                  maxLength={300}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {formData.targetAudience.length}/300
                </div>
              </div>

              <div className="relative">
                <Textarea
                  placeholder="Any websites or apps that inspire you? (URLs or descriptions)"
                  rows={3}
                  value={formData.inspiration}
                  onChange={(e) => handleChange("inspiration", e.target.value)}
                  className="bg-white border-2 border-gray-200 focus:border-lime-500 rounded-2xl resize-none text-base transition-colors duration-200"
                  maxLength={300}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">{formData.inspiration.length}/300</div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-lime-500 hover:bg-lime-600"
            } text-white font-semibold py-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-lime-500/25 transition-all duration-300 group text-lg`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Submitting Project Inquiry...
              </>
            ) : (
              <>
                Submit Project Inquiry
                <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function StartProjectPage() {
  const router = useRouter()

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
      <section className="pt-24 pb-16 bg-gradient-to-br from-lime-50 to-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-lime-100 text-lime-700 px-6 py-3 rounded-full text-base font-semibold mb-8">
              🚀 Start Your Project
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Let's Build Something
              <span className="block text-lime-500">Amazing Together</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? Share your project details with us and let's create something
              extraordinary that drives real results for your business.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                step: "01",
                title: "Share Your Vision",
                description: "Tell us about your project goals, requirements, and timeline",
                icon: Target,
              },
              {
                step: "02",
                title: "Strategy Session",
                description: "We'll schedule a call to discuss your needs and create a roadmap",
                icon: Zap,
              },
              {
                step: "03",
                title: "Proposal & Start",
                description: "Receive a detailed proposal and timeline to begin your project",
                icon: Rocket,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-lime-600" />
                </div>
                <div className="text-3xl font-bold text-lime-600 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {/* Project Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <ProjectInquiryForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, text: "hello@shrinav.com", href: "mailto:hello@shrinav.com", label: "Email Us" },
                    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567", label: "Call Us" },
                    { icon: MapPin, text: "123 Innovation Street, Tech City", href: "#", label: "Visit Us" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-lime-600 transition-colors group"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-lime-200 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="h-6 w-6 text-lime-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.label}</div>
                        <div className="text-gray-600 text-sm">{item.text}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Why Choose Shrinav?</h4>
                <div className="space-y-4">
                  {[
                    "7+ years of experience",
                    "150+ successful projects",
                    "99.9% client satisfaction",
                    "24/7 support & maintenance",
                    "Agile development process",
                    "Transparent communication",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.8 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 text-lime-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  {[
                    { name: "WhatsApp", icon: MessageCircle, color: "hover:bg-green-500", href: "#" },
                    { name: "LinkedIn", icon: Users, color: "hover:bg-blue-600", href: "#" },
                    { name: "Instagram", icon: Palette, color: "hover:bg-pink-500", href: "#" },
                    { name: "Facebook", icon: Globe, color: "hover:bg-blue-500", href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center text-lime-600 hover:text-white transition-all duration-300 ${social.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
