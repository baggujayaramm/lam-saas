import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col pt-12">
            <div className="px-6 pb-12 text-center">
                <Link href="/" className="text-primary font-semibold hover:underline mb-8 inline-block">&larr; Back to Home</Link>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Simple, transparent pricing</h1>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Start with a 30-day free trial. Scale as you grow.</p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-24">
                {/* Starter Plan */}
                <div className="border border-border rounded-3xl p-8 bg-card shadow-sm flex flex-col relative">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-foreground mb-2">Starter</h2>
                        <p className="text-neutral-600">Perfect for new organizations and small cohorts.</p>
                    </div>
                    <div className="mb-8 border-b border-border pb-8">
                        <span className="text-5xl font-extrabold tracking-tight">$49</span>
                        <span className="text-neutral-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Up to 100 Active Seats</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>3 Active Cohorts</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Basic Email Support</span>
                        </li>
                    </ul>
                    <Link href="/signup" className="w-full block text-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold py-4 rounded-xl transition-colors">
                        Start Free Trial
                    </Link>
                </div>

                {/* Pro Plan */}
                <div className="border border-primary rounded-3xl p-8 bg-card shadow-xl flex flex-col relative ring-1 ring-primary">
                    <div className="absolute top-0 right-8 transform -translate-y-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">Most Popular</span>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-foreground mb-2">Pro</h2>
                        <p className="text-neutral-600">For established organizations scaling their operations.</p>
                    </div>
                    <div className="mb-8 border-b border-neutral-100 pb-8">
                        <span className="text-5xl font-extrabold tracking-tight">$199</span>
                        <span className="text-neutral-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Unlimited Active Seats</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Unlimited Cohorts</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Custom Subdomain</span>
                        </li>
                        <li className="flex items-center gap-3 text-neutral-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>Priority 24/7 Support</span>
                        </li>
                    </ul>
                    <Link href="/signup" className="w-full block text-center bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-4 rounded-xl transition-colors shadow-md">
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </div>
    )
}
