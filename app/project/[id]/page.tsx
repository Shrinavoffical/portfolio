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
  MessageCircle,
  Globe,
  Palette,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import siteData from "@/data/siteData.json"

// Image/Video Slider Component
const MediaSlider = ({ media, title }: { media: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length)
  }

  // Check if current media is a video
  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('youtube.com') || url.includes('vimeo.com')
  }

  // Stop autoplay if current media is a video and it's playing
  useEffect(() => {
    if (isVideo(media[currentIndex])) {
      setIsAutoPlay(false)
    }
  }, [currentIndex, media])

  useEffect(() => {
    if (!isAutoPlay || isVideoPlaying) return
    
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlay, isVideoPlaying, media.length])

  return (
    <div 
      className="relative overflow-hidden rounded-3xl shadow-2xl group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => !isVideoPlaying && setIsAutoPlay(true)}
    >
      <div 
        className="flex transition-all duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((src, index) => (
          <div key={index} className="w-full h-96 flex-shrink-0">
            {isVideo(src) ? (
              <video 
                src={src} 
                className="w-full h-full object-cover"
                controls
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
            ) : (
              <Image
                src={src || "/placeholder.svg"}
                alt={`${title} - Image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft className="h-5 w-5 rotate-180" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex ? 'bg-primary scale-110' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${((currentIndex + 1) / media.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

// Create gallery images for each project
const createProjectGallery = (mainImage: string, index: number) => {
  const galleryImages = [
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  ]
  
  // Start with main image and add 3 more
  return [mainImage, ...galleryImages.filter(img => img !== mainImage).slice(0, 3)]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  const projectIndex = parseInt(params.id as string) - 1
  const project = siteData.projects[projectIndex]
  
  // Add gallery images to project
  const projectWithGallery = project ? {
    ...project,
    images: {
      hero: project.image,
      gallery: createProjectGallery(project.image, projectIndex)
    },
    bgGradient: "from-primary-100 to-primary-200"
  } : null

  if (!projectWithGallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary-dark">
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
            <div className="flex items-center cursor-hover">
              <Image
                src="/logo.jpg"
                alt="Shrinav Logo"
                width={40}
                height={40}
                className="rounded-lg mr-3"
                priority
              />
              <Link href="/" className="text-3xl font-bold tracking-tight">
                <span className="text-primary">Shrinav</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["About", "Services", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary transition-colors font-medium relative group cursor-hover"
                >
                  {item}
                </Link>
              ))}
              
              <div className="flex space-x-2 ml-4">
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-hover"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shrinav-digital-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-hover"
                >
                  <Users className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
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
                className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm mb-6"
              >
                {projectWithGallery.category}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{projectWithGallery.title}</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{projectWithGallery.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  {projectWithGallery.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  {projectWithGallery.team || '6 developers'}
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2" />
                  {projectWithGallery.year}
                </div>
              </div>

              {/* Project buttons removed */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${projectWithGallery.bgGradient} rounded-3xl transform rotate-3 scale-105`}
              />
              <div className="relative z-10">
                <MediaSlider media={projectWithGallery.images.gallery} title={projectWithGallery.title} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Metrics Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(projectWithGallery.metrics).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-50 p-6 rounded-2xl"
              >
                <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}


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
            {projectWithGallery.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <CheckCircle className="h-6 w-6 text-primary mb-4" />
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
            {projectWithGallery.technologies.map((tech, index) => (
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
              <p className="text-gray-600 text-lg leading-relaxed">{projectWithGallery.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{projectWithGallery.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial - Only shown if testimonial exists */}
      {projectWithGallery.testimonial && projectWithGallery.testimonial.quote && (
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
                  <div className="text-6xl text-primary mb-6">"</div>
                  <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">{projectWithGallery.testimonial.quote}</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={projectWithGallery.testimonial.avatar || "/placeholder.svg"}
                      alt={projectWithGallery.testimonial.author || 'Client'}
                      width={80}
                      height={80}
                      className="rounded-full mr-6"
                    />
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-xl">{projectWithGallery.testimonial.author}</div>
                      <div className="text-gray-600">{projectWithGallery.testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {/* <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your ideas into Meets Innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">Start Your Project</Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                View More Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}

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
                {[MessageCircle, Users, Palette, Globe].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300 cursor-hover"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-6 text-lg">Services</h5>
              <ul className="space-y-3 text-gray-400">
                {["Web Development", "App Development", "Digital Marketing", "Custom Software Development"].map((item) => (
                  <li key={item}>
                    <Link href="/#services" className="hover:text-primary transition-colors cursor-hover">
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
                    <Link href="/#about" className="hover:text-primary transition-colors cursor-hover">
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
