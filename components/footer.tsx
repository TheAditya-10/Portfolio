import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="#"
              className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              Aditya.
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">Data Scientist & ML Engineer</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/TheAditya-10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/aditya-pratap-singh-tomar-693444204/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:aditya.pratap.singh.tomar.1082006@email.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Aditya Pratap Singh Tomar. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground italic text-center">
              "The only way to do great work is to love what you do." — Steve Jobs
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
