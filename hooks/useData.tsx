"use client"

import { useState, useEffect } from "react"
import siteData from "../data/siteData.json"

export const useData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setData(siteData)
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}

export const useProjectData = (projectId) => {
  const { data } = useData()
  const project = data?.projects?.find((p) => p.id === Number.parseInt(projectId))
  return project
}
