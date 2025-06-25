"use client"

import { Badge, Card, CardContent } from "./UIComponents"
import { getIcon } from "./IconComponents"
import { motion } from "framer-motion"

export default function ProjectsGrid({ data = { projects: [] } }) {
  const ArrowRightIcon = getIcon("arrow-right")

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto relative z-10">
        <div className="md:container grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data?.projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:scale-105 hover:-translate-y-2 relative z-20">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-gray-50 p-2 rounded-xl group-hover:bg-primary-50 transition-colors duration-300">
                      <div className="flex justify-center">
                        {project.metrics.logo === "Python" && (
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.5 4.8c.677 0 1.325.092 1.898.264.573.17 1.075.406 1.504.707.43.3.768.67 1.016 1.106.248.436.372.92.372 1.452v3.277c0 .531-.124 1.014-.372 1.45-.248.436-.586.804-1.016 1.106-.43.3-.93.537-1.504.708-.573.17-1.221.256-1.898.256h-3.5v3.666H6.9V4.8H11.5zm-3.5 2.1v3.566h3.5c.31 0 .62-.044.93-.132.31-.088.588-.22.83-.396.243-.176.44-.396.59-.66.15-.264.225-.572.225-.924V7.98c0-.352-.075-.66-.225-.924-.15-.264-.347-.484-.59-.66-.242-.176-.52-.308-.83-.396-.31-.088-.62-.132-.93-.132H8zm10.798 2.9c-.677 0-1.325.092-1.898.264-.573.17-1.075.406-1.504.707-.43.3-.768.67-1.016 1.106-.248.436-.372.92-.372 1.452v3.277c0 .531.124 1.014.372 1.45.248.436.586.804 1.016 1.106.43.3.93.537 1.504.708.573.17 1.221.256 1.898.256h3.5v-2.1h-3.5c-.31 0-.62-.044-.93-.132-.31-.088-.588-.22-.83-.396-.243-.176-.44-.396-.59-.66-.15-.264-.225-.572-.225-.924v-.66h6.075v-2.616h-6.075v-.66c0-.352.075-.66.225-.924.15-.264.347-.484.59-.66.242-.176.52-.308.83-.396.31-.088.62-.132.93-.132h3.5v-2.1h-3.5z"/>
                          </svg>
                        )}
                        {project.metrics.logo === "Web" && (
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.34-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
                          </svg>
                        )}
                        {project.metrics.logo === "CRM" && (
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                          </svg>
                        )}
                        {project.metrics.logo === "JS" && (
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                          </svg>
                        )}
                        {project.metrics.logo === "Java" && (
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639"/>
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Tech</div>
                    </div>
                    <div className="text-center bg-gray-50 p-2 rounded-xl group-hover:bg-primary-50 transition-colors duration-300">
                      <div className="flex items-center justify-center">
                        <svg className="h-5 w-5 text-primary mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <div className="text-sm font-bold text-primary">{project.metrics.year}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Year</div>
                    </div>
                    <div className="text-center bg-gray-50 p-2 rounded-xl group-hover:bg-primary-50 transition-colors duration-300">
                      <div className="flex items-center justify-center">
                        <div className="text-sm font-bold text-primary mr-1">{project.metrics.rating}</div>
                        <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Rating</div>
                    </div>
                  </div>

                  <button
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-3 rounded-2xl transition-all duration-300 text-sm flex items-center justify-center group/btn"
                    onClick={() => (window.location.href = `/project/${project.id}`)}
                  >
                    View Project
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}