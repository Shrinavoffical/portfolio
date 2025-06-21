"use client"

import type React from "react"
import { useEffect } from "react"

function CursorTracker() {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement

    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    }

    const handleMouseEnter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursor.style.backgroundColor = "rgba(101, 163, 13, 0.1)"
    }

    const handleMouseLeave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.backgroundColor = "transparent"
    }

    document.addEventListener("mousemove", moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="custom-cursor"></div>
      {children}
      <CursorTracker />
    </>
  )
}
