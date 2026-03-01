import Link from 'next/link'
import { ArrowRight, CheckCircle2, Layout, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <header className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
                <div className="font-bold text-xl tracking-tight text-primary">Cohort Platform</div>
                <nav className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium text-neutral-600 hover:text-foreground transition-colors">Features</Link>
                    <Link href="/pricing" className="text-sm font-medium text-neutral-600 hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="#faq" className="text-sm font-medium text-neutral-600 hover:text-foreground transition-colors">FAQ</Link>
                </nav>
                <div className="flex gap-4">
                    <Link href="/login" className="text-sm font-medium px-4 py-2 hover:bg-neutral-100 rounded-md transition-colors">Log In</Link>
                    <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary-dark transition-colors">Get Started</Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative px-6 pt-32 pb-40 overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                    <div className="inline-flex items-center rounded-full border border-border bg-neutral-50 px-3 py-1 text-sm font-medium text-neutral-800 mb-8 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        Now in Public Beta
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6 leading-tight">
                        The intelligent operating system for <span className="text-primary">cohort-based learning</span>
                    </h1>

                    <p className="text-xl text-neutral-600 max-w-2xl mb-10 leading-relaxed">
                        Everything you need to run transformative group learning experiences.
                        From enrollments to graduation, all in one beautifully crafted platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                        <Link href="/signup" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-primary-dark hover:shadow-lg transition-all transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                            Start 30-day Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing" className="flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors w-full sm:w-auto text-lg">
                            View Pricing
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-6 bg-neutral-50 border-y border-border">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Built for scale. Designed for humans.</h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">We've stripped away the complexity so you can focus on what matters most: your learners.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Beautiful Dashboards</h3>
                                <p className="text-neutral-600 leading-relaxed">Give your instructors and students a dedicated, distraction-free environment tailored to their role.</p>
                            </div>

                            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                                <p className="text-neutral-600 leading-relaxed">Built on modern Edge architecture with Next.js, ensuring your platform is incredibly responsive everywhere.</p>
                            </div>

                            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-600">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
                                <p className="text-neutral-600 leading-relaxed">Total data isolation with strict multi-tenancy rules and role-based access controls out of the box.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border border-border rounded-xl p-6 bg-card border-l-4 border-l-primary shadow-sm">
                            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> How does the 30-day trial work?</h4>
                            <p className="text-neutral-600">You gain full access to the Organization Admin dashboard to setup courses, cohorts, and invite instructors. No credit card required.</p>
                        </div>
                        <div className="border border-border rounded-xl p-6 bg-card">
                            <h4 className="text-lg font-semibold mb-2">Can I customize the domain?</h4>
                            <p className="text-neutral-600">Yes, on the Pro tier you can map your organization to a custom subdomain or root domain.</p>
                        </div>
                        <div className="border border-border rounded-xl p-6 bg-card">
                            <h4 className="text-lg font-semibold mb-2">What happens when my trial expires?</h4>
                            <p className="text-neutral-600">Your account transitions to view-only mode. You will need to upgrade to a paid tier to regain mutation abilities.</p>
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="py-24 px-6 bg-foreground text-background text-center rounded-t-[3rem] mt-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to transform your cohorts?</h2>
                    <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">Join hundreds of forward-thinking organizations delivering exceptional learning experiences.</p>
                    <Link href="/signup" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-light transition-colors shadow-lg">
                        Create your organization today
                    </Link>
                </section>
            </main>
        </div>
    )
}
