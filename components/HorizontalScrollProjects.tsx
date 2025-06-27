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
                      <div className="flex justify-center p-1">
                        {project.metrics.logo === "Web" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.34-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
                            </svg>
                          </div>
                        )}
                        {project.metrics.logo === "App" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                            </svg>
                          </div>
                        )}
                        {project.metrics.logo === "CRM" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                            </svg>
                          </div>
                        )}
                        {project.metrics.logo === "Model" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 3L1 9l11 6l11-6l-11-6zM4 12v6l8 4.99l8-4.99v-6l-8 5l-8-5z"/>
                            </svg>
                          </div>
                        )}
                        {project.category.toLowerCase().includes("extension") && (
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>
                            </svg>
                          </div>
                        )}
                        {(project.category.toLowerCase().includes("admin") || project.category.toLowerCase().includes("management")) && (
                          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                            </svg>
                          </div>
                        )}
                        {project.category.toLowerCase().includes("inventory") && (
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21 16V8a1 1 0 0 0-.514-.874l-8-4a1 1 0 0 0-.972 0l-8 4A1 1 0 0 0 3 8v8a1 1 0 0 0 .514.874l8 4a1 1 0 0 0 .972 0l8-4A1 1 0 0 0 21 16z"/>
                            </svg>
                          </div>
                        )}
                        {(project.category.toLowerCase().includes("ai") || project.category.toLowerCase().includes("healthcare")) && (
                          <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </div>
                        )}
                        {!project.metrics.logo && !project.category.toLowerCase().match(/web|app|crm|model|extension|admin|management|inventory|ai|healthcare/) && (
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H4c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* <div className="text-xs text-gray-600 mt-1">Tech</div> */}
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
                      {/* <div className="text-xs text-gray-600 mt-1">Year</div> */}
                    </div>
                    <div className="text-center bg-gray-50 p-2 rounded-xl group-hover:bg-primary-50 transition-colors duration-300">
                      <div className="flex items-center justify-center">
                        <div className="text-sm font-bold text-primary mr-1">{project.metrics.rating}</div>
                        <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      </div>
                      {/* <div className="text-xs text-gray-600 mt-1">Rating</div> */}
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