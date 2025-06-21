"use client"

import React from "react"
import { motion } from "framer-motion"
import { useData } from "../hooks/useData"
import { getIcon } from "./IconComponents"
import { Badge, Button } from "./UIComponents"

const StartProjectPage = () => {
  const { data, loading } = useData()

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-500"></div>
      </div>
    )
  }

  const ArrowLeftIcon = getIcon("arrow-left")
  const TargetIcon = getIcon("target")
  const ZapIcon = getIcon("zap")
  const RocketIcon = getIcon("rocket")

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-lime-500">{data.company.name.slice(0, 3)}</span>
              <span className="text-gray-900">{data.company.name.slice(3)}</span>
            </a>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
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
            {data.projectInquirySteps.map((item, index) => {
              const StepIcon = getIcon(item.icon)
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <StepIcon className="h-8 w-8 text-lime-600" />
                  </div>
                  <div className="text-3xl font-bold text-lime-600 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your project? Contact us today and let's discuss how we can help bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a
              href={`mailto:${data.company.contact.email}`}
              className="text-center bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(getIcon("mail"), { className: "h-8 w-8 text-lime-600" })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600">{data.company.contact.email}</p>
            </motion.a>

            <motion.a
              href={`tel:${data.company.contact.phone}`}
              className="text-center bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(getIcon("phone"), { className: "h-8 w-8 text-lime-600" })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600">{data.company.contact.phone}</p>
            </motion.a>

            <motion.div
              className="text-center bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(getIcon("map-pin"), { className: "h-8 w-8 text-lime-600" })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600">{data.company.contact.address}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StartProjectPage
