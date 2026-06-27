"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Gift, X } from "lucide-react"

const STORAGE_KEY = "apst-service-offer-dismissed"

export function OfferPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "true") return

    const timer = window.setTimeout(() => setVisible(true), 4500)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    window.localStorage.setItem(STORAGE_KEY, "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 md:left-auto md:right-6 md:w-[420px]">
      <div className="rounded-xl border border-primary/30 bg-background/95 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">Free AI automation audit</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Share one process and I will suggest a practical AI or software automation path.
            </p>
            <Link
              href="#enquiry"
              onClick={close}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              Claim the audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Close offer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
