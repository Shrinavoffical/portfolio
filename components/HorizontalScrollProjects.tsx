"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge, Card, CardContent } from "./UIComponents"
import { getIcon } from "./IconComponents"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HorizontalScrollProjects({ data = { projects: [] } }) {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const projectsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollContainerRef.current
    const projectElements = projectsRef.current

    if (!container || !scrollContainer || projectElements.length === 0) return

    // Clear previous ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    const ctx = gsap.context(() => {
      // Calculate total scroll width
      const totalWidth = projectElements.length * 500 + (projectElements.length - 1) * 32

      // Set initial states for smooth entry
      gsap.set(container, { opacity: 0 })
      gsap.set(projectElements, { opacity: 0, y: 100, scale: 0.8 })

      // Entry animation
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          onEnter: () => {
            gsap.to(container, { opacity: 1, duration: 0.5 })
          },
        },
      })

      entryTl.to(projectElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      })

      // Main horizontal scroll animation
      const horizontalScroll = gsap.to(scrollContainer, {
        x: () => -(totalWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Individual project animations
      projectElements.forEach((project, index) => {
        if (!project) return

        const image = project.querySelector(".project-image")
        const content = project.querySelector(".project-content")
        const title = project.querySelector(".project-title")
        const description = project.querySelector(".project-description")
        const tech = project.querySelector(".project-tech")
        const metrics = project.querySelector(".project-metrics")

        // Set initial states
        gsap.set([title, description, tech, metrics], {
          y: 30,
          opacity: 0,
        })

        gsap.set(image, {
          scale: 1.05,
          opacity: 0.9,
        })

        // Create timeline for each project
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "left 90%",
            end: "right 10%",
            scrub: 0.5,
            horizontal: true,
            containerAnimation: horizontalScroll,
          },
        })

        // Animate elements in sequence
        tl.to(image, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(
            title,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            description,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .to(
            [metrics, tech],
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.3",
          )

        // Fade out animation
        gsap.to(project, {
          opacity: 0.4,
          scale: 0.98,
          scrollTrigger: {
            trigger: project,
            start: "right 20%",
            end: "right 0%",
            scrub: 0.5,
            horizontal: true,
            containerAnimation: horizontalScroll,
          },
        })
      })

      // Progress indicator
      gsap.to(".scroll-progress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 0.3,
        },
      })
    }, container)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [data])

  const addToRefs = (el, index) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current[index] = el
    }
  }

  const ExternalLinkIcon = getIcon("external-link")
  const ArrowRightIcon = getIcon("arrow-right")

  return (
    <div ref={containerRef} className="horizontal-scroll-section relative bg-gradient-to-br from-gray-50 to-white">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="scroll-progress h-full bg-lime-500 w-0"></div>
      </div>

      <div className="h-screen flex items-center overflow-hidden">
        <div ref={scrollContainerRef} className="flex gap-8 pl-6 pr-6">
          {data?.projects?.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => addToRefs(el, index)}
              className="flex-shrink-0 w-[500px] h-[650px] group cursor-pointer"
            >
              <Card className="h-full border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden relative flex flex-col">
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-5`} />

                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110">
                      <ExternalLinkIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="project-content p-8 flex flex-col h-full">
                  <div className="flex-1">
                    {/* Project Title */}
                    <h3 className="project-title text-2xl font-bold text-gray-900 mb-4 group-hover:text-lime-600 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="project-description text-gray-600 mb-6 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="project-metrics grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="text-center bg-gray-50 p-3 rounded-xl group-hover:bg-lime-50 transition-colors duration-300"
                        >
                          <div className="text-lg font-bold text-lime-600 mb-1">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="project-tech flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-lime-100 hover:text-lime-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button
                      className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300 group/btn flex items-center justify-center shadow-lg hover:shadow-xl"
                      onClick={() => (window.location.href = `/project/${project.id}`)}
                    >
                      View Project
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-gray-500 text-sm mb-2">Scroll to explore projects</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-1 bg-gray-300 rounded-full">
            <div className="w-2 h-1 bg-lime-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
