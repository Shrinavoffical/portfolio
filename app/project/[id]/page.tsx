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
  Cpu,
  BrainCircuit,
  Code,
  Database,
  Mail,
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
const createProjectGallery = (project: any) => {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery
  }
  // Fallback to main image if no gallery is specified
  return [project.image || '/placeholder.svg']
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
      hero: project.image || '/placeholder.svg',
      gallery: createProjectGallery(project)
    },
    bgGradient: "from-primary-100 to-primary-200",
    technologies: project.technologies || [],
    features: project.features || []
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
    <div className="min-h-screen bg-white cursor-auto">
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
                src="/logo.jpg"
                alt="Shrinav Logo"
                width={40}
                height={40}
                className="rounded-lg mr-3"
                priority
              />
              <div className="text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">Shrinav</span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["About", "Services", "Projects", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
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
                  href="https://www.instagram.com/shrinav._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
      </motion.nav>

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
            {projectWithGallery.features && projectWithGallery.features.length > 0 ? projectWithGallery.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                {index === 0 && feature.toLowerCase().includes('ai') ? (
                <BrainCircuit className="h-6 w-6 text-primary mb-4" />
              ) : index === 1 ? (
                <Cpu className="h-6 w-6 text-primary mb-4" />
              ) : index === 2 ? (
                <Database className="h-6 w-6 text-primary mb-4" />
              ) : index === 3 ? (
                <Code className="h-6 w-6 text-primary mb-4" />
              ) : (
                <CheckCircle className="h-6 w-6 text-primary mb-4" />
              )}
                <p className="text-gray-700 font-medium">{feature}</p>
              </motion.div>
            )) : (
              <p className="text-gray-600 col-span-full text-center">No features specified for this project.</p>
            )}
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
            {projectWithGallery.technologies && projectWithGallery.technologies.length > 0 ? projectWithGallery.technologies.map((tech, index) => (
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
            )) : (
              <p className="text-gray-600">No technologies specified for this project.</p>
            )}
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
                <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">Shrinav</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Where Imagination Meets Innovation stories. We create exceptional experiences that drive growth and
                inspire innovation.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "WhatsApp", href: "https://wa.me/+919016771335", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg> },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/shrinav-66a234365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
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
                    <Link href="/#services" className="hover:text-primary transition-colors">
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
                    <Link href={"/#"+item.toLowerCase()} className="hover:text-primary transition-colors">
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
