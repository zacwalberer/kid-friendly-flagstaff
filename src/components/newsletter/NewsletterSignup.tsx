'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fadeIn, slideUp } from '@/lib/animations'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await response.json()
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center">
              <motion.div variants={slideUp} className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl">Stay in the Loop</CardTitle>
              <CardDescription>
                Get updates on new kid-friendly spots and seasonal activities in Flagstaff.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="font-medium text-green-700">Thanks for subscribing!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We&apos;ll keep you posted on new activities.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (status === 'error') setStatus('idle')
                        }}
                        className="flex-1"
                        disabled={status === 'loading'}
                      />
                      <Button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                    {status === 'error' && (
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
