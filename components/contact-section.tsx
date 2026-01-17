"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { LucideIcon } from "lucide-react"
import {
  AlertCircle,
  BookOpen,
  Code2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Trophy,
  Twitter,
  Youtube,
} from "lucide-react"
import Link from "next/link"
import emailjs from "@emailjs/browser"

type SocialLink = {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

type SocialGroup = {
  title: string
  subtitle: string
  links: SocialLink[]
  spanFull?: boolean
}

const socialGroups: SocialGroup[] = [
  {
    title: "Code & Practice",
    subtitle: "Daily builds, contests, and growth logs.",
    links: [
      { label: "GitHub", href: "https://github.com/TheAditya-10", icon: Github, external: true },
      { label: "LeetCode", href: "https://leetcode.com/TheAditya_10", icon: Code2, external: true },
      { label: "Codeforces", href: "https://codeforces.com/profile/TheAditya_10", icon: Trophy, external: true },
      { label: "GFG", href: "https://auth.geeksforgeeks.org/user/TheAditya_10/", icon: BookOpen, external: true },
    ],
  },
  {
    title: "Social & Media",
    subtitle: "Stories, updates, and behind the scenes.",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aditya-pratap-singh-tomar-693444204/",
        icon: Linkedin,
        external: true,
      },
      { label: "Instagram", href: "https://www.instagram.com/theaditya.10/", icon: Instagram, external: true },
      { label: "X", href: "https://x.com/TheAditya_10", icon: Twitter, external: true },
      { label: "YouTube", href: "https://www.youtube.com/@TheAditya_10", icon: Youtube, external: true },
    ],
  },
  {
    title: "Direct Connect",
    subtitle: "Fastest ways to reach me personally.",
    spanFull: true,
    links: [
      { label: "Email", href: "mailto:aditya.pratap.singh.tomar.1082006@email.com", icon: Mail },
      { label: "WhatsApp", href: "https://wa.me/917898292920", icon: MessageCircle, external: true },
    ],
  },
]

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

      // Send email using EmailJS
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      console.log("Email sent successfully:", result.text)
      setSubmitted(true)
      formRef.current?.reset()
    } catch (err) {
      console.error("Failed to send email:", err)
      setError("Failed to send message. Please try again or contact me directly via email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">GET IN TOUCH</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={cn(
              "space-y-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                Whether it's AI, machine learning, or data science – let's build something amazing together.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <Link
                    href="mailto:aditya.pratap.singh.tomar.1082006@email.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    aditya.pratap.singh.tomar.1082006@email.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">+91-78982-92920</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Jabalpur, Madhya Pradesh, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-primary font-mono text-xs tracking-[0.2em]">SOCIALS</p>
                  <h4 className="text-lg font-semibold text-foreground">Find Me Online</h4>
                </div>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Split by how we can connect, collaborate, or keep in touch.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {socialGroups.map((group) => (
                  <div
                    key={group.title}
                    className={cn(
                      "rounded-xl border border-border/70 bg-secondary/40 p-4 space-y-3",
                      group.spanFull ? "sm:col-span-2" : "",
                    )}
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono tracking-[0.2em] text-primary/80">{group.title}</p>
                      <p className="text-xs text-muted-foreground">{group.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.links.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:bg-background hover:text-foreground"
                          >
                            <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                            {link.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setError(null)
                    }}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="from_name"
                        placeholder="Your name"
                        required
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="reply_to"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      required
                      className="bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="bg-secondary/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
