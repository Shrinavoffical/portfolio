"use client"

import { Badge, Card, CardContent } from "./UIComponents"
import { getIcon } from "./IconComponents"
import { motion } from "framer-motion"

export default function ProjectsGrid({ data = { projects: [] } }) {
  const ArrowRightIcon = getIcon("arrow-right")

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center bg-gray-50 p-2 rounded-xl group-hover:bg-primary-50 transition-colors duration-300">
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
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